import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebaseConfig';
import { Check, X, AlertTriangle } from 'lucide-react';
import styles from '../styles/Pages.module.scss';
import CardTurno from '../components/CardTurno/CardTurno';
import Loader from '../components/Loader/Loader';

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turnoToDelete, setTurnoToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'turnos'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const turnosList = querySnapshot.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }));

        setTurnos(turnosList);
      } catch (error) {
        console.error('Error al traer tus turnos:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      const turnoRef = doc(db, 'turnos', id);
      await updateDoc(turnoRef, updatedData);

      setTurnos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
      );
    } catch (error) {
      console.error('❌ Error al actualizar turno:', error);
    }
  };

  const confirmDelete = (id) => {
    setTurnoToDelete(id);
  };

  const cancelDelete = () => {
    setTurnoToDelete(null);
  };

  const executeDelete = async () => {
    if (!turnoToDelete) return;

    try {
      await deleteDoc(doc(db, 'turnos', turnoToDelete));
      setTurnos((prev) => prev.filter((t) => t.id !== turnoToDelete));
    } catch (error) {
      console.error('❌ Error al eliminar turno:', error);
    } finally {
      setTurnoToDelete(null);
    }
  };

  if (loading) return <Loader />;

  if (turnos.length === 0) {
    return (
      <div className={styles.containerGeneral}>
        <h1>Mis turnos</h1>
        <p>Todavía no pediste ningún turno.</p>
      </div>
    );
  }

  return (
    <div className={styles.containerGeneral}>
      <h1>Mis turnos</h1>

      <div className={styles.containerGeneralTurnos}>
        {turnos.map((turno) => (
          <CardTurno
            key={turno.id}
            turno={turno}
            onUpdate={handleUpdate}
            onDelete={() => confirmDelete(turno.id)}
          />
        ))}
      </div>


      {turnoToDelete && (
        <div className={styles.modalOverlayTurnos} onClick={cancelDelete}>
          <div 
            className={styles.modalContentTurnos} 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-labelledby="modal-title"
          >
            <div className={styles.modalHeaderTurnos}>
              <AlertTriangle className={styles.warningIconTurnos} size={28} />
              <h3 id="modal-title">¿Eliminar turno?</h3>
            </div>
            
            <p>Esta acción no se puede deshacer.</p>

            <div className={styles.modalActionsTurnos}>
              <button 
                onClick={cancelDelete} 
                className={styles.btnCancelTurnos}
                aria-label="Cancelar eliminación"
              >
                <X size={18} /> No, conservar
              </button>
              
              <button 
                onClick={executeDelete} 
                className={styles.btnConfirmTurnos}
                aria-label="Confirmar eliminación"
              >
                <Check size={18} /> Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisTurnos;