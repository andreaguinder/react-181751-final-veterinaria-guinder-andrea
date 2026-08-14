import styles from './Footer.module.scss';

const Footer = () => {

    return (
        <>

            <div className={styles.containerFooter}>
                <p>Desarrollado por
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