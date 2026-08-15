import { useState, useEffect, useRef, useMemo } from 'react';
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


    const serviciosFiltrados = useMemo(() => {
        if (!servicios) return [];

        const term = searchTerm.toLowerCase().trim();
        if (!term) return servicios;

        return servicios.filter((serv) => {
            const nombreCoincide = serv.nombre?.toLowerCase().includes(term);

            return nombreCoincide;
        });
    }, [servicios, searchTerm]);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.containerGeneral}>
            <h1>Nuestros Servicios</h1>
            <div className={styles.searchContainer}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar servicio por nombre..."
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
                    <p>No se encontraron servicios que coincidan con la búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default Servicios;