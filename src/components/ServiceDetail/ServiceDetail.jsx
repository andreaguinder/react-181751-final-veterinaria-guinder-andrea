import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './ServiceDetail.module.scss';

function ServiceDetail({ nombre, imagen, descripcion, precio }) {
  const navigate = useNavigate();

  const handleOnVolver = () => {
    navigate(-1);
  };

  return (
    <>
      <button className={styles.buttonVolver} onClick={handleOnVolver}>
        <ArrowLeft size={24} /> Volver
      </button>

      <div className={styles.containerServiceDetail}>
        <div className={styles.cardDetail}>
          <div>
            <img src={imagen} alt={nombre} />
          </div>
          <div className={styles.containerInfo}>
            <h2>{nombre}</h2>
            <p className={styles.descripcion}>{descripcion}</p>
            <p className={styles.precio}>${precio}</p>


            <Link 
              to="/pedir-turno" 
              state={{ servicio: { nombre, descripcion } }} 
              className={styles.buttonPedirTurno}
            >
              Pedir turno
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetail;