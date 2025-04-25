import styles from "./styles.module.css";

interface ComparisonChartProps {
  purchases: number;
  sales: number;
}

export const ComparisonChart = ({ purchases, sales }: ComparisonChartProps) => {
  const maxValue = Math.max(purchases, sales) * 1.2;

  return (
    <div className={styles.comparisonChart}>
      <div
        className={styles.chartBar}
        style={{ height: `${(purchases / maxValue) * 100}%` }}
      >
        Compras
        <div>R$ {purchases.toLocaleString("pt-BR")}</div>
      </div>
      <div
        className={`${styles.chartBar} ${styles.salesBar}`}
        style={{ height: `${(sales / maxValue) * 100}%` }}
      >
        Vendas
        <div>R$ {sales.toLocaleString("pt-BR")}</div>
      </div>
    </div>
  );
};
