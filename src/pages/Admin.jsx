import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { CheckCircle2, Clock } from 'lucide-react';
import Loader from '../components/Loader/Loader';
import CardTurnoAdmin  from '../components/CardTurnoAdmin/CardTurnoAdmin';
import styles from '../styles/Pages.module.scss';

const Admin = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const turnosRef = collection(db, 'turnos');
    const unsubscribe = onSnapshot(turnosRef, (snapshot) => {
      const turnosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTurnos(turnosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleCompleted = async (id, currentStatus) => {
    try {
      const turnoRef = doc(db, 'turnos', id);
      await updateDoc(turnoRef, { isCompleted: !currentStatus });
    } catch (error) {
      console.error('Error al actualizar turno:', error);
    }
  };

  if (loading) return <Loader />;

  const turnosPendientes = turnos.filter((t) => !t.isCompleted);
  const turnosCompletados = turnos.filter((t) => t.isCompleted);

  return (
    <div className={styles.containerAdmin}>
      <h1 className={styles.tituloAdmin}>Turnos agendados de pacientes</h1>

      <div className={styles.columnasContainer}>
        {/* PENDIENTES */}
        <section className={styles.seccionColumna}>
          <h2>
            <Clock size={22} stroke='#6b057a'/> Turnos Pendientes ({turnosPendientes.length})
          </h2>
          <div className={styles.listaCards}>
            {turnosPendientes.length === 0 ? (
              <p className={styles.sinTurnos}>No hay turnos pendientes.</p>
            ) : (
              turnosPendientes.map((turno) => (
                <CardTurnoAdmin 
                  key={turno.id} 
                  turno={turno} 
                  onToggleCompleted={handleToggleCompleted} 
                />
              ))
            )}
          </div>
        </section>

        <hr className={styles.separadorAdmin} />


        <section className={styles.seccionColumna}>
          <h2>
            <CheckCircle2 size={22} stroke='#6b057a'/> Turnos Completos ({turnosCompletados.length})
          </h2>
          <div className={styles.listaCards}>
            {turnosCompletados.length === 0 ? (
              <p className={styles.sinTurnos}>No hay turnos completados.</p>
            ) : (
              turnosCompletados.map((turno) => (
                <CardTurnoAdmin 
                  key={turno.id} 
                  turno={turno} 
                  onToggleCompleted={handleToggleCompleted} 
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;