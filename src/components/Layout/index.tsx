import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sistema de Fornecedores</h1>
      </header>
      <main className={styles.main}>{children || <Outlet />}</main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Layout;
