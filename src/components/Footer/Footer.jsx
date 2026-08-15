import styles from './Footer.module.scss';

const Footer = () => {

    return (
        <>

            <div className={styles.containerFooter}>
                <p className={styles.disclaimer}>
  Este sitio web es un proyecto académico realizado únicamente con fines educativos. La veterinaria, los servicios, turnos y datos presentados son completamente ficticios.
</p>
                <p>Diseño y desarrollo por
                    <a
                    href="https://andreaguinder.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    > Andrea Guinder
                    </a>
                </p>
            </div>

        </>
    );
}

export default Footer;