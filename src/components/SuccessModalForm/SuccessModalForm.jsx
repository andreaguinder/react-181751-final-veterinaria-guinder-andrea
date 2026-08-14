import React from 'react';
import { CheckCircle } from 'lucide-react';
import styles from './SuccessModalForm.module.scss';
import { Link } from 'react-router-dom';

function SuccessModalForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div className={styles.iconContainer}>
          <CheckCircle size={56} className={styles.successIcon} />
        </div>
        
        <h2>¡Turno enviado!</h2>
        <p>Tu turno se envió correctamente. Podés visualizarlo en <Link to="/mis-turnos">Mis turnos</Link></p>
      </div>
    </div>
  );
}

export default SuccessModalForm;