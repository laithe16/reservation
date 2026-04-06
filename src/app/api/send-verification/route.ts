import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialise Resend avec la clé secrète depuis .env.local, fallback vers une clé bidon pour le build Vercel
const resend = new Resend(process.env.RESEND_API_KEY || 'missing_key');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Par défaut, Resend expédie avec onboarding@resend.dev vers l'email (réservé aux tests avec l'adresse du propriétaire sur Vercel/Resend)
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Modifiez avec votre domaine vérifié en production
      to: [email],
      subject: 'Vérifiez votre adresse e-mail de réservation',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Vérification de votre adresse e-mail</h2>
          <p>Bonjour,</p>
          <p>Vous avez créé un compte lors de votre réservation. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse e-mail.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://votresite.com/verify?email=${encodeURIComponent(email)}" style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Confirmer mon e-mail</a>
          </div>
          <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Resend Internal Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
