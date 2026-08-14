import { useParams } from 'react-router-dom';
import { useServicios } from '../hooks/useServices'; 
import ServiceDetail from '../components/ServiceDetail/ServiceDetail';
import Loader from '../components/Loader/Loader';

function ItemServiceDetail() {
  const { id } = useParams(); 
  

  const { data: serviceDetail, loading, error } = useServicios(id);

  if (loading) return <Loader />;

  if (error || !serviceDetail) {
    return <p>{error || 'El servicio no existe.'}</p>;
  }

  return (
    <ServiceDetail
      nombre={serviceDetail.nombre}
      imagen={serviceDetail.imagen}
      descripcion={serviceDetail.descripcion}
      precio={serviceDetail.precio}
    />
  );
}

export default ItemServiceDetail;