import { Link } from "react-router-dom";
// Adicionei a importação do mockProducts
import styles from "./styles.module.css";

import StockHistory from "./StockHistory";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao Sistema da HeroPet</h1>

      <div className={styles.actions}>
        <Link to="/fornecedores" className={styles.button}>
          Fornecedores
        </Link>
        <Link to="/clientes" className={styles.button}>
          Clientes (Em construção)
        </Link>
      </div>

      <StockHistory />
    </div>
  );
};

export default Home;
