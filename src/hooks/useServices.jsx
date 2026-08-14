import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const useServicios = (id = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔍 Buscando servicio con id:", id);

      try {
        if (id) {
          const docRef = doc(db, 'servicios', id);
          const docSnap = await getDoc(docRef);

          if (!isMounted) return;

          if (docSnap.exists()) {
            console.log("✅ Servicio encontrado:", docSnap.data());
            setData({ ...docSnap.data(), id: docSnap.id });
          } else {
            console.warn("⚠️ Documento no encontrado en Firestore.");
            setError('El servicio no existe.');
          }
        } else {
          const querySnapshot = await getDocs(collection(db, 'servicios'));

          if (!isMounted) return;

          const serviciosList = querySnapshot.docs.map((d) => ({
            ...d.data(),
            id: d.id,
          }));

          console.log("✅ Lista de servicios cargada:", serviciosList.length);
          setData(serviciosList);
        }
      } catch (err) {
        console.error('❌ Error al conectar con Firestore:', err);
        if (isMounted) setError('Error al obtener los datos.');
      } finally {
        if (isMounted) setLoading(false); 
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading, error };
};