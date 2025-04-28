import styles from "./styles.module.css";
import StockHistory from "./StockHistory";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.stockHistoryContainer}>
        <h2 className={styles.stockHistoryTitle}>Histórico de Estoque</h2>
        <StockHistory />
      </div>
    </div>
  );
};

export default Home;
