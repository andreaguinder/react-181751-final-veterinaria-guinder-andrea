import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout/MainLayout';

import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import PedirTurno from './pages/PedirTurno';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminRoute from './components/AdminRoute/AdminRoute';
import MisTurnos from './pages/MisTurnos';
import Admin from './pages/Admin';

import ItemServiceDetail from './pages/ItemServiceDetail';
import './index.scss';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Inicio />} />
          <Route path="servicios/:id/:slug?" element={<ItemServiceDetail />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="pedir-turno" element={<PedirTurno />} />
          <Route path="login" element={<Login />} />


          <Route
            path="mis-turnos"
            element={
              <ProtectedRoute>
                <MisTurnos />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;