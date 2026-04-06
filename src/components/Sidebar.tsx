import styles from './Sidebar.module.css';

interface SidebarProps {
  step: number;
  data: any;
  onNext: () => void;
  onBack: () => void;
}

export default function Sidebar({ step, data, onNext, onBack }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Récapitulatif</h2>
      
      <div className={styles.consultantInfo}>
        <div className={styles.avatar}>
          {/* Placeholder for actual image */}
          <img src="https://ui-avatars.com/api/?name=Philippe+Gambart&background=0D8ABC&color=fff" alt="Consultant" />
        </div>
        <div className={styles.consultantDetails}>
          <div className={styles.consultantName}>Maître Philippe GAMBART</div>
          <div className={styles.consultantType}>Consultation vidéo</div>
        </div>
      </div>

      <div className={styles.datetimeSection}>
        <div className={styles.infoRow}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          mardi 7 avril 2026
        </div>
        <div className={styles.infoRow}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          10:30 • {data.serviceDuration} min
        </div>
        <div className={styles.infoRow}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          Visioconférence
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardLabel}>Service</div>
        <div className={styles.cardValue}>{data.serviceDuration === 30 ? 'Réponse rapide' : data.serviceDuration === 45 ? 'Analyse approfondie' : 'Stratégie + plan d\'action'}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardLabel}>Motif</div>
        <div className={styles.cardValue}>{data.motive}</div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span>{data.serviceDuration === 30 ? 'Réponse rapide' : 'Consultation'} ({data.serviceDuration} min)</span>
          <span className={styles.price}>€{data.price}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total HT</span>
          <span>€{data.price}</span>
        </div>
      </div>

      <div className={styles.actions}>
        {step > 1 && (
          <button className={styles.backBtn} onClick={onBack}>Retour</button>
        )}
        <button className={styles.nextBtn} onClick={onNext}>Suivant</button>
      </div>
    </div>
  );
}
