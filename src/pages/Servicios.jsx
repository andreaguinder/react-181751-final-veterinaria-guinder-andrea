import { useState, useEffect, useRef } from 'react'; 
import { useServicios } from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import styles from '../styles/Pages.module.scss';
import Loader from '../components/Loader/Loader';

const Servicios = () => {
    const { data: servicios, loading, error } = useServicios();
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

useEffect(() => {
    if (servicios) {
      searchInputRef.current?.focus();
    }
  }, [servicios]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const serviciosFiltrados = servicios ? servicios.filter((serv) =>
    serv.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];



    return (
        <div className={styles.containerGeneral}>
            <h1>Nuestros Servicios</h1>
            <div className={styles.searchContainer}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar servicio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.containerServiciosInicio}>
                {serviciosFiltrados.length > 0 ? (
                    serviciosFiltrados.map(serv => (
                        <ServiceCard
                            key={serv.id}
                            id={serv.id}
                            image={serv.imagen}
                            title={serv.nombre}
                            price={serv.precio}
                        />
                    ))
                ) : (
                    <p>No se encontraron servicios con ese nombre.</p>
                )}
            </div>
        </div>
    );
};

export default Servicios;