import React from 'react';
import styles from './CardTurnoAdmin.module.scss';

const TurnoCard = ({ turno, onToggleCompleted }) => {
  return (
    <div 
      className={`${styles.cardTurnoAdmin} ${turno.isCompleted ? styles.turnoCompletado : ''}`}
    >
      <div className={styles.infoTurno}>
        <p><strong>Dueño:</strong> {turno.nombre}</p>
        <p><strong>Mascota:</strong> {turno.mascota}</p>
        <p><strong>Fecha:</strong> {turno.fecha} a las {turno.horario}</p>
        <p><strong>Email:</strong> {turno.userEmail}</p>
        <p className={styles.mensajeTurno}><strong>Consulta:</strong> {turno.mensaje}</p>
      </div>

      <div className={styles.toggleContainer}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={turno.isCompleted}
            onChange={() => onToggleCompleted(turno.id, turno.isCompleted)}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.estadoLabel}>Completado</span>
      </div>
    </div>
  );
};

export default TurnoCard;