import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav} id="nav">
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="FōrmAI Logo" />
          </div>
          <div className={styles.menuDerecha}>
            <ul>
              <li><Link href="/"><a>Inicio</a></Link></li>
              <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
              <li><Link href="/history"><a>Historial</a></Link></li>
              <li><Link href="/perfil"><a>Perfil</a></Link></li>
            </ul>
            <Link href="/perfil">
              <a className={styles.profileLink}>
                <img src="/images/profile-icon.png" alt="Perfil" className={styles.profileIcon} />
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
