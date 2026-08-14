import styles from './Loader.module.scss';

const Loader = () => {

  return (

          <div className={styles.waveLoader}>
            <span></span>
            <span></span>
            <span></span>
          </div>
  );
};

export default Loader;