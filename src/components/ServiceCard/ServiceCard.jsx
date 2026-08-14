import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.scss';

const ServiceCard = ( { id, image, title, price }) => {

    const slug = title
    ?.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "") 
    .replace(/\s+/g, "-");
    
    return (

        <div className={styles.serviceCard}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>${price}</p>

<Link className={styles.serviceCardButton} to={`/servicios/${id}/${slug}`}>
        Ver detalle
      </Link>
        </div>

    );
}

export default ServiceCard;