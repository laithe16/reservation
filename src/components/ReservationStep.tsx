/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import styles from './ReservationStep.module.css';

interface ReservationStepProps {
  data: any;
  onChange: (data: any) => void;
}

export default function ReservationStep({ data, onChange }: ReservationStepProps) {
  const services = [
    { duration: 30, price: 10, label: 'Réponse rapide' },
    { duration: 45, price: 15, label: 'Analyse approfondie' },
    { duration: 60, price: 20, label: 'Stratégie + plan d\'action' },
  ];

  return (
    <div className={styles.stepContainer}>
      <h3 className={styles.sectionTitle}>
        <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Vos coordonnées
      </h3>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Prénom <span className={styles.required}>*</span></label>
          <input 
            type="text" 
            value={data.firstName} 
            onChange={(e) => onChange({ firstName: e.target.value })} 
            placeholder="Ex: Aghiles" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nom <span className={styles.required}>*</span></label>
          <input 
            type="text" 
            value={data.lastName} 
            onChange={(e) => onChange({ lastName: e.target.value })} 
            placeholder="Ex: Yahiaoui" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Adresse e-mail <span className={styles.required}>*</span></label>
          <input 
            type="email" 
            value={data.email} 
            onChange={(e) => onChange({ email: e.target.value })} 
            placeholder="Ex: yahiaoui.aghiles@gmail.com" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Numéro de téléphone <span className={styles.required}>*</span></label>
          <input 
            type="tel" 
            value={data.phone} 
            onChange={(e) => onChange({ phone: e.target.value })} 
            placeholder="Ex: 054212451" 
          />
        </div>
      </div>

      <div className={styles.formGroupFull}>
        <label>Motif de consultation <span className={styles.required}>*</span></label>
        <select 
          value={data.motive} 
          onChange={(e) => onChange({ motive: e.target.value })}
        >
          <option value="Fiscalité internationale / expatriation">Fiscalité internationale / expatriation</option>
          <option value="Création d'entreprise">Création d'entreprise</option>
          <option value="Autre motif">Autre motif</option>
        </select>
      </div>

      <div className={styles.formGroupFull}>
        <label>Brève description <span className={styles.required}>*</span></label>
        <textarea 
          rows={4}
          value={data.description} 
          onChange={(e) => onChange({ description: e.target.value })} 
          placeholder="Décrivez votre situation en quelques lignes (contexte, objectifs, délais, documents disponibles)."
        />
      </div>

      <h3 className={styles.sectionTitle} style={{marginTop: '2rem'}}>
        Choisissez un service <span className={styles.required}>*</span>
      </h3>
      
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div 
            key={service.duration}
            className={`${styles.serviceCard} ${data.serviceDuration === service.duration ? styles.active : ''}`}
            onClick={() => onChange({ serviceDuration: service.duration, price: service.price })}
          >
            {data.serviceDuration === service.duration && (
              <div className={styles.activeIndicator}></div>
            )}
            <div className={styles.serviceHeader}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{service.duration} min</span>
            </div>
            <div className={styles.servicePrice}>€{service.price}</div>
            <div className={styles.serviceLabel}>{service.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
