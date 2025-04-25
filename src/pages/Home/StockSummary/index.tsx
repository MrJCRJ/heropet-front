import { Pedido, PeriodFilter } from "../../../api/pedidos";
import { BarChart } from "../Charts/BarChart";
import styles from "./styles.module.css";

interface StockSummaryProps {
  orders: Pedido[];
  filter: PeriodFilter;
}

export const StockSummary = ({ orders, filter }: StockSummaryProps) => {
  // Filtrar pedidos pelo período selecionado
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.dataPedido);
    const orderYear = orderDate.getFullYear();
    const orderMonth = orderDate.getMonth() + 1;

    if (filter.type === "year") {
      return orderYear === filter.year;
    } else {
      return orderYear === filter.year && orderMonth === filter.month;
    }
  });

  // Calcular estoque
  const stockData = filteredOrders.reduce((acc, order) => {
    order.itens.forEach((item) => {
      if (!acc[item.produto]) {
        acc[item.produto] = {
          product: item.produto,
          purchased: 0,
          sold: 0,
        };
      }

      if (order.tipo === "COMPRA") {
        acc[item.produto].purchased += item.quantidade;
      } else {
        acc[item.produto].sold += item.quantidade;
      }
    });

    return acc;
  }, {} as Record<string, { product: string; purchased: number; sold: number }>);

  const chartData = Object.values(stockData)
    .sort((a, b) => b.purchased + b.sold - (a.purchased + a.sold))
    .slice(0, 5); // Top 5 produtos

  return (
    <div className={styles.summarySection}>
      <h2 className={styles.sectionTitle}>Resumo de Estoque</h2>

      <div className={styles.chartContainer}>
        <BarChart
          data={chartData}
          labels={chartData.map((item) => item.product)}
          purchasedData={chartData.map((item) => item.purchased)}
          soldData={chartData.map((item) => item.sold)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.stockTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Produto</th>
              <th className={styles.tableHeader}>Comprado</th>
              <th className={styles.tableHeader}>Vendido</th>
              <th className={styles.tableHeader}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(stockData).map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td className={styles.tableCell}>{item.product}</td>
                <td className={styles.tableCell}>
                  {item.purchased.toLocaleString()}
                </td>
                <td className={styles.tableCell}>
                  {item.sold.toLocaleString()}
                </td>
                <td className={`${styles.tableCell} ${styles.balanceCell}`}>
                  {item.purchased - item.sold}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
