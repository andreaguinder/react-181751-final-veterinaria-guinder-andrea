import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
    const { isLoginOpen, closeLogin, login } = useAuth();

    return (
        <div className={styles.layoutContainer}>
            <Header />

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default MainLayout;