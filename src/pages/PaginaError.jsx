
import { Link } from 'react-router-dom';
import styles from '../styles/Pages.module.scss';

const PaginaError = () => {
  return (
    <div className={styles.containerPagError}>
      <div className={styles.logoContainer}>
        <img src='/pwa-512x512.png' alt="Logo Veterinaria" className={styles.logoError} />
      </div>

      <div className={styles.contentError}>
        <h1>¡Oops!</h1>
        <h2>Error 404 - Página no encontrada</h2>
        <p>
          Parece que la página que estás buscando no existe, fue movida o el link está roto.
        </p>

        <Link to="/" className={styles.btnForm}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default PaginaError;