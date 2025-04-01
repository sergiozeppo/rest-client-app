import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a
            href="https://github.com/sergiozeppo"
            target="_blank"
            rel="noopener noreferrer"
          >
            sergiozeppo
          </a>
          <a
            href="https://github.com/kamilmrogowski"
            target="_blank"
            rel="noopener noreferrer"
          >
            kamilmrogowski
          </a>
          <a
            href="https://github.com/yelantsevv"
            target="_blank"
            rel="noopener noreferrer"
          >
            yelantsevv
          </a>
        </div>
        <div className={styles.info}>
          <span>© 2025 | All rights reserved</span>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/refs/heads/master/react/assets/rss-logo.svg"
              alt="Course Logo"
              className={styles.logo}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
