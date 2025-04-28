import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../../images/logo.jpeg";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo HeroPet" className={styles.logo} />
            <h1 className={styles.title}>HeroPet</h1>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/fornecedores" className={styles.navLink}>
              Fornecedores
            </Link>
            <Link to="/clientes" className={styles.navLink}>
              Clientes
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children || <Outlet />}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            © {new Date().getFullYear()} HeroPet - Todos os direitos reservados
          </p>
          <div className={styles.footerLinks}>
            <a href="/politica-de-privacidade">Política de Privacidade</a>
            <a href="/termos-de-uso">Termos de Uso</a>
            <a href="/contato">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
