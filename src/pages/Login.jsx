import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import styles from '../styles/Pages.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg('');

  let loggedUser = null;

  try {
    const newCredential = await createUserWithEmailAndPassword(auth, email, password);
    loggedUser = newCredential.user;

  } catch (createError) {
    if (createError.code === 'auth/email-already-in-use') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        loggedUser = userCredential.user;
      } catch (loginError) {
        console.error('Error al loguearse:', loginError);
        setErrorMsg('Contraseña incorrecta para este email.');
        return;
      }
    } else if (createError.code === 'auth/weak-password') {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    } else {
      console.error('Error al registrar:', createError);
      setErrorMsg('Error al procesar el ingreso. Verifica los datos.');
      return;
    }
  }

  if (loggedUser) {
    try {
      const pendingTurnoRaw = sessionStorage.getItem('pendingTurno');

      if (pendingTurnoRaw) {
        const pendingTurno = JSON.parse(pendingTurnoRaw);


        await addDoc(collection(db, 'turnos'), {
          userId: loggedUser.uid,
          userEmail: loggedUser.email,
          nombre: pendingTurno.nombre,
          mascota: pendingTurno.mascota,
          fecha: pendingTurno.fecha,
          horario: pendingTurno.horario,
          mensaje: pendingTurno.mensaje,
          isCompleted: false,
          createdAt: new Date(),
        });

        sessionStorage.removeItem('pendingTurno');
        navigate('/mis-turnos', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/mis-turnos';
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Error guardando turno en Firestore:', err);
    }
  }
};

  return (
    <div className={styles.containerGeneral}>
      <h1>Iniciar Sesión / Acceso</h1>

      <form onSubmit={handleSubmit} className={styles.formTurno}>
        {errorMsg && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</p>}

        <label>
          <span>Email:</span>
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Contraseña:</span>
          <input
            type="password"
            placeholder="Tu contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.btnForm}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;