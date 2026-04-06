import styles from './Stepper.module.css';

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { id: 1, label: 'Réservation' },
    { id: 2, label: 'Compte' },
    { id: 3, label: 'Validation carte' }
  ];

  return (
    <div className={styles.stepperContainer}>
      <ol className={styles.stepperList}>
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <li 
              key={step.id} 
              className={`
                ${styles.stepItem} 
                ${isActive ? styles.active : ''} 
                ${isCompleted ? styles.completed : ''}
              `}
            >
              <div className={styles.stepCircle}>{step.id}</div>
              <span className={styles.stepLabel}>{step.label}</span>
            </li>
          );
        })}
      </ol>
      <div className={styles.progressTrack}>
        <div style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} className={styles.progressFill}></div>
      </div>
    </div>
  );
}
