import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${styles.notFoundAnimation}`}>
        404 - Página Não Encontrada
      </h1>
      <p className={styles.message}>
        A página que você está procurando pode ter sido removida, ter seu nome
        alterado ou está temporariamente indisponível.
      </p>
      <Link to="/" className={styles.link}>
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFound;
