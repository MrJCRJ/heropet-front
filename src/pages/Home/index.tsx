import { useState } from "react";
import { Link } from "react-router-dom";
import { PeriodFilters } from "./PeriodFilters"; // Adicionei a importação do mockProducts
import styles from "./styles.module.css";
import { PeriodFilter } from "../../api/pedidos";
import StockHistory from "./StockHistory";

const Home = () => {
  const currentDate = new Date();
  const [filter, setFilter] = useState<PeriodFilter>({
    type: "month",
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

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

      <PeriodFilters filter={filter} onChange={setFilter} />
    </div>
  );
};

export default Home;
