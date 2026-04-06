/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Stepper from './Stepper';
import ReservationStep from './ReservationStep';
import AccountStep from './AccountStep';
import Sidebar from './Sidebar';
import styles from './BookingProcess.module.css';

export default function BookingProcess() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Réservation, 2 = Compte, 3 = Validation

  // Form State
  const [reservationData, setReservationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    motive: 'Fiscalité internationale / expatriation',
    description: '',
    serviceDuration: 30, // 30, 45, 60
    price: 10,
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeBtn}>×</button>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Réserver une consultation</h1>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <Stepper currentStep={currentStep} />
          
          <div className={styles.stepContent}>
            {currentStep === 1 && (
              <ReservationStep 
                data={reservationData} 
                onChange={(data: any) => setReservationData({...reservationData, ...data})} 
              />
            )}
            {currentStep === 2 && (
              <AccountStep onNext={handleNext} />
            )}
            {currentStep === 3 && (
              <div style={{padding: '2rem'}}>Validation carte (placeholder)</div>
            )}
          </div>
        </div>
        
        <Sidebar 
          step={currentStep} 
          data={reservationData} 
          onNext={handleNext} 
          onBack={handleBack} 
        />
      </div>
    </div>
  );
}
