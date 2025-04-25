import { Pedido, PeriodFilter } from "../../../api/pedidos";
import { ComparisonChart } from "../Charts/ComparisonChart";
import styles from "./styles.module.css";

interface FinancialSummaryProps {
  orders: Pedido[];
  filter: PeriodFilter;
}

export const FinancialSummary = ({ orders, filter }: FinancialSummaryProps) => {
  const { totalPurchases, totalSales } = orders.reduce(
    (acc, order) => {
      const orderDate = new Date(order.dataPedido);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth() + 1;

      const matchesFilter =
        filter.type === "year"
          ? orderYear === filter.year
          : orderYear === filter.year && orderMonth === filter.month;

      if (matchesFilter) {
        if (order.tipo === "COMPRA") {
          acc.totalPurchases += order.totalPedido;
        } else {
          acc.totalSales += order.totalPedido;
        }
      }

      return acc;
    },
    { totalPurchases: 0, totalSales: 0 }
  );

  return (
    <div className={styles.summarySection}>
      <h2 className={styles.sectionTitle}>Resumo Financeiro</h2>

      <div className={styles.financialCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Compras</h3>
          <p className={styles.cardValue}>
            R$ {totalPurchases.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Vendas</h3>
          <p className={styles.cardValue}>
            R$ {totalSales.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Lucro Bruto</h3>
          <p className={styles.cardValue}>
            R$ {(totalSales - totalPurchases).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <ComparisonChart purchases={totalPurchases} sales={totalSales} />
    </div>
  );
};
