import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import styles from './CardTurno.module.scss';

const CardTurno = ({ turno, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  

  const [formData, setFormData] = useState({
    nombre: turno.nombre || '',
    mascota: turno.mascota || '',
    fecha: turno.fecha || '',
    horario: turno.horario || '',
    mensaje: turno.mensaje || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(turno.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {

    setFormData({
      nombre: turno.nombre || '',
      mascota: turno.mascota || '',
      fecha: turno.fecha || '',
      horario: turno.horario || '',
      mensaje: turno.mensaje || '',
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`${styles.cardTurno} ${styles.editing}`}>
        <label>
          <span>Dueño:</span>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Mascota:</span>
          <input
            type="text"
            name="mascota"
            value={formData.mascota}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Fecha:</span>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Horario:</span>
          <input
            type="time"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Motivo:</span>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />
        </label>

        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.btnSave}>
            <Check size={18} /> Guardar
          </button>
          <button onClick={handleCancel} className={styles.btnCancel}>
            <X size={18} /> Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardTurno}>
      <p><span>Dueño: </span>{turno.nombre}</p>
      <p><span>Nombre de la mascota: </span>{turno.mascota}</p>
      <p><span>Turno:</span> {turno.fecha} a las {turno.horario}</p>
      <p><span>Motivo de consulta:</span> {turno.mensaje}</p>

      <div className={styles.actions}>
        <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
          <Pencil size={18} /> Editar
        </button>
        <button onClick={() => onDelete(turno.id)} className={styles.btnDelete}>
          <Trash2 size={18} /> Borrar
        </button>
      </div>
    </div>
  );
};

export default CardTurno;