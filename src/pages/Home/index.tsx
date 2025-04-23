import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao Sistema da HeroPet</h1>
      <p>Gerenciamento de forma eficiente</p>

      <div className={styles.actions}>
        <Link to="/fornecedores" className={styles.button}>
          Ver Fornecedores
        </Link>
        <Link to="/fornecedores/novo" className={styles.button}>
          Adicionar Fornecedor
        </Link>
      </div>
    </div>
  );
};

export default Home;
