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
        <Link to="/pedidos" className={styles.button}>
          Ver Pedidos
        </Link>
        <Link to="/pedidos/novo" className={styles.button}>
          Criar Pedido
        </Link>
      </div>
    </div>
  );
};

export default Home;
