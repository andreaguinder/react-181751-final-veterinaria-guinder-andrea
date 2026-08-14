import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import styles from './Header.module.scss';


const ADMIN_EMAIL = 'admin@gmail.com';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <button 
        className={styles.hamburgerBtn} 
        onClick={toggleMenu} 
        aria-label="Menú de navegación"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}

      <div className={`${styles.menuWrapper} ${isOpen ? styles.open : ''}`}>
        <NavLink to="/" className={styles.link} onClick={closeMenu}>
          Inicio
        </NavLink>
        <NavLink to="/servicios" className={styles.link} onClick={closeMenu}>
          Servicios
        </NavLink>
        <NavLink to="/pedir-turno" className={styles.link} onClick={closeMenu}>
          Pedir turno
        </NavLink>
        

        {user && (
          <NavLink to="/mis-turnos" className={styles.link} onClick={closeMenu}>
            Mis turnos
          </NavLink>
        )}


        {user?.email === ADMIN_EMAIL && (
          <NavLink to="/admin" className={styles.link} onClick={closeMenu}>
            Administración
          </NavLink>
        )}

        <div className={styles.userSection}>
          {user ? (
            <button onClick={handleLogout} className={styles.buttonLogout}>
              Cerrar sesión
            </button>
          ) : (
            <NavLink to="/login" className={styles.buttonLogin} onClick={closeMenu}>
              Iniciar sesión
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;