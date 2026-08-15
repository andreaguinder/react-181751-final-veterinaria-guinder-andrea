import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebaseConfig';
import { validarTurno } from '../utils/validations';
import styles from '../styles/Pages.module.scss';

const PedirTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [errores, setErrores] = useState({});

  const [formData, setFormData] = useState({
    nombre: '',
    mascota: '',
    fecha: '',
    horario: '',
    mensaje: '',
  });

  useEffect(() => {
    const servicioSeleccionado = location.state?.servicio;
    if (servicioSeleccionado) {
      setFormData((prev) => ({
        ...prev,
        mensaje: `Consulta por servicio: ${servicioSeleccionado.nombre} (${servicioSeleccionado.descripcion})`,
      }));
    }
  }, [location.state]);

  const guardarEnFirestore = async (usuario, data) => {
    try {
      const nuevoTurno = {
        userId: usuario.uid,
        userEmail: usuario.email,
        nombre: data.nombre.trim(),
        mascota: data.mascota.trim(),
        fecha: data.fecha,
        horario: data.horario,
        mensaje: data.mensaje.trim(),
        isCompleted: false,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'turnos'), nuevoTurno);
      sessionStorage.removeItem('pendingTurno');
      navigate('/mis-turnos');
    } catch (error) {
      console.error('Error al guardar el turno:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);

      const pendingData = sessionStorage.getItem('pendingTurno');
      if (currentUser && pendingData) {
        const parsedData = JSON.parse(pendingData);
        const validacion = validarTurno(parsedData);
        
        if (validacion.valido) {
          await guardarEnFirestore(currentUser, parsedData);
        } else {
          sessionStorage.removeItem('pendingTurno');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loadingAuth) return;

    const validacion = validarTurno(formData);

    if (!validacion.valido) {
      setErrores(validacion.errores);
      return; 
    }

    if (!user) {
      sessionStorage.setItem('pendingTurno', JSON.stringify(formData));
      navigate('/login');
      return;
    }

    await guardarEnFirestore(user, formData);
  };

  return (
    <div className={styles.containerGeneral}>
      <h1>Pedir turno</h1>


      <form onSubmit={handleSubmit} className={styles.formTurno} noValidate>
        <label>
          <span>Nombre del dueño:</span>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <p className={styles.errorText}>{errores.nombre}</p>}
        </label>

        <label>
          <span>Nombre de la mascota:</span>
          <input
            type="text"
            name="mascota"
            value={formData.mascota}
            onChange={handleChange}
          />
          {errores.mascota && <p className={styles.errorText}>{errores.mascota}</p>}
        </label>

        <label>
          <span>Fecha:</span>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
          {errores.fecha && <p className={styles.errorText}>{errores.fecha}</p>}
        </label>

        <label>
          <span>Horario:</span>
          <input
            type="time"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />
          {errores.horario && <p className={styles.errorText}>{errores.horario}</p>}
        </label>

        <label>
          <span>Motivo de consulta:</span>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />
          {errores.mensaje && <p className={styles.errorText}>{errores.mensaje}</p>}
        </label>

        <button type="submit" className={styles.btnForm} disabled={loadingAuth}>
          {loadingAuth ? 'Cargando...' : 'Confirmar turno'}
        </button>
      </form>
    </div>
  );
};

export default PedirTurno;