/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import { useState } from 'react';
import styles from './AccountStep.module.css';

interface AccountStepProps {
  onNext: () => void;
}

export default function AccountStep({ onNext }: AccountStepProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'login'>('create');
  
  // Verification logic state
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [emailProviderLink, setEmailProviderLink] = useState('');

  const handleSubmit = (e?: any) => {
    e?.preventDefault();
    const mail = email.toLowerCase();
    
    if (mail.includes('@gmail.')) {
      setEmailProviderLink('https://mail.google.com');
      setShowVerification(true);
    } else if (mail.includes('@hotmail.') || mail.includes('@outlook.') || mail.includes('@live.')) {
      setEmailProviderLink('https://outlook.live.com');
      setShowVerification(true);
    } else if (mail.includes('@yahoo.')) {
      setEmailProviderLink('https://mail.yahoo.com');
      setShowVerification(true);
    } else {
      // Default behavior if no specific provider is detected or no verification link is needed
      onNext();
    }
  };

  const handleVerificationClick = () => {
    // Adding a short delay lets the user see they clicked it, then moves to next step safely
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.title}>Compte</h2>

      <div className={styles.tabsContainer}>
        <div 
          className={`${styles.tab} ${activeTab === 'create' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Créer un compte
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Se connecter
        </div>
      </div>

      {activeTab === 'create' && (
        <div className={styles.formContainer}>
          <div className={styles.formGroupFull}>
            <label>Nom complet</label>
            <input type="text" placeholder="Jean Dupont" />
          </div>
          
          <div className={styles.formGroupFull}>
            <label>Adresse e-mail</label>
            <input 
              type="email" 
              placeholder="vous@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Mot de passe</label>
              <input type="password" />
            </div>
            <div className={styles.formGroup}>
              <label>Confirmer</label>
              <input type="password" />
            </div>
          </div>

          {showVerification ? (
            <div className={styles.verificationBox}>
              <h4 className={styles.verificationTitle}>Vérifiez votre boîte e-mail</h4>
              <p className={styles.verificationDesc}>
                Pour des raisons de sécurité, nous avons détecté une adresse e-mail connue. Veuillez cliquer ci-dessous pour ouvrir votre messagerie, confirmer votre adresse, puis passer à la dernière étape.
              </p>
              <a 
                href={emailProviderLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.openMailBtn}
                onClick={handleVerificationClick}
              >
                Ouvrir ma messagerie
              </a>
              <button className={styles.skipBtn} onClick={onNext}>
                J'ai déjà vérifié
              </button>
            </div>
          ) : (
            <>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Créer mon compte
              </button>

              <div className={styles.divider}>
                <span>Ou s'inscrire avec</span>
              </div>

              <div className={styles.socialLogins}>
            <button className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google
            </button>
            <button className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V0h11.4v24zM24 24H12.6V0H24v24z"/>
              </svg>
              Microsoft
            </button>
            <button className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.776 5.862h-4.708l-3.33 8.326-5.834-11.455h-4.305l8.136 14.856v6.411h4.223v-6.32l5.818-11.818z"/>
              </svg>
              Yahoo
            </button>
            <button className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          </>
          )}
        </div>
      )}

      {activeTab === 'login' && (
         <div className={styles.formContainer}>
           <div className={styles.formGroupFull}>
             <label>Adresse e-mail</label>
             <input type="email" placeholder="vous@email.com" />
           </div>
           <div className={styles.formGroupFull}>
             <label>Mot de passe</label>
             <input type="password" />
           </div>
           <button className={styles.submitBtn}>
             Se connecter
           </button>

           <div className={styles.divider}>
             <span>Ou se connecter avec</span>
           </div>

           <div className={styles.socialLogins}>
             <button className={styles.socialBtn}>
               <svg viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
               </svg>
               Google
             </button>
             <button className={styles.socialBtn}>
               <svg viewBox="0 0 24 24" fill="currentColor">
                 <path d="M11.4 24H0V0h11.4v24zM24 24H12.6V0H24v24z"/>
               </svg>
               Microsoft
             </button>
             <button className={styles.socialBtn}>
               <svg viewBox="0 0 24 24" fill="currentColor">
                 <path d="M22.776 5.862h-4.708l-3.33 8.326-5.834-11.455h-4.305l8.136 14.856v6.411h4.223v-6.32l5.818-11.818z"/>
               </svg>
               Yahoo
             </button>
             <button className={styles.socialBtn}>
               <svg viewBox="0 0 24 24" fill="currentColor">
                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
               </svg>
               Facebook
             </button>
           </div>
         </div>
      )}
    </div>
  );
}
