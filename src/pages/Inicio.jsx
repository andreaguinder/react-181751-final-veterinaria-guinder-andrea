import styles from '../styles/Pages.module.scss';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Inicio = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.tituloPrincipal}>
        Bienvenidos a Veterinaria Huellas
      </h1>

      <p className={styles.infoPrincipal}>
        En Veterinaria Huellas nos dedicamos al cuidado integral de tus mascotas con el amor y compromiso que se merecen. 
        Contamos con un equipo de profesionales apasionados y un entorno cálido para que cada visita sea una experiencia tranquila.
      </p>


      <div className={styles.primeraFoto}>
        <img 
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800" 
          alt="Veterinaria atendiendo a un paciente gatito" 
        />
      </div>

      <div className={styles.primeraInfo}>
        <h2>Atención Veterinaria de Excelencia</h2>
        <p>
          Ofrecemos servicios de medicina preventiva, consultas clínicas, vacunación y cirugías generales. 
          Acompañamos a tu compañero en cada etapa de su vida para asegurar su bienestar.
        </p>
      </div>

      <div className={styles.segundaFoto}>
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
          alt="Imagen de perros felices"
        />
      </div>

      <div className={styles.ultimaInfo}>
        <h2>Amor por Perros y Gatos</h2>
        <p>
          Sabemos que cada mascota es única. Adaptamos nuestras instalaciones para reducir el estrés tanto de perros como de gatitos, garantizando un trato dulce y respetuoso.
        </p>
      </div>
    </div>
  );
};

export default Inicio;