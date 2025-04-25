import { Pedido, PeriodFilter } from "../../../api/pedidos";
import { BarChart } from "../Charts/BarChart";
import styles from "./styles.module.css";

interface StockSummaryProps {
  orders: Pedido[];
  filter: PeriodFilter;
  currentStock: Record<string, number>; // Adicionando estoque atual
}

export const StockSummary = ({
  orders,
  filter,
  currentStock,
}: StockSummaryProps) => {
  // Filtrar pedidos pelo período
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.dataPedido);
    const orderYear = orderDate.getFullYear();
    const orderMonth = orderDate.getMonth() + 1;
    return filter.type === "year"
      ? orderYear === filter.year
      : orderYear === filter.year && orderMonth === filter.month;
  });

  // Calcular movimentação e estoque atual
  const stockData = filteredOrders.reduce(
    (acc, order) => {
      order.itens.forEach((item) => {
        if (!acc[item.produto]) {
          acc[item.produto] = {
            product: item.produto,
            purchased: 0,
            sold: 0,
            currentStock: currentStock[item.produto] || 0,
            lowStock: (currentStock[item.produto] || 0) < 10, // Exemplo: alerta para <10 unidades
          };
        }

        if (order.tipo === "COMPRA") {
          acc[item.produto].purchased += item.quantidade;
        } else {
          acc[item.produto].sold += item.quantidade;
        }
      });
      return acc;
    },
    {} as Record<
      string,
      {
        product: string;
        purchased: number;
        sold: number;
        currentStock: number;
        lowStock: boolean;
      }
    >
  );

  // Ordenar por maior movimentação
  const sortedData = Object.values(stockData).sort(
    (a, b) => b.purchased + b.sold - (a.purchased + a.sold)
  );

  return (
    <div className={styles.summarySection}>
      <h2 className={styles.sectionTitle}>
        Resumo de Estoque - {filter.type === "month" ? "Mensal" : "Anual"}
      </h2>

      <div className={styles.stockOverview}>
        <div className={styles.overviewCard}>
          <span>Produtos em estoque</span>
          <strong>{Object.keys(currentStock).length}</strong>
        </div>
        <div className={styles.overviewCard}>
          <span>Produtos com baixo estoque</span>
          <strong className={styles.warning}>
            {Object.values(stockData).filter((item) => item.lowStock).length}
          </strong>
        </div>
      </div>

      <BarChart
        data={sortedData.slice(0, 5)}
        labels={sortedData.slice(0, 5).map((item) => item.product)}
        purchasedData={sortedData.slice(0, 5).map((item) => item.purchased)}
        soldData={sortedData.slice(0, 5).map((item) => item.sold)}
      />

      <table className={styles.stockTable}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Comprado</th>
            <th>Vendido</th>
            <th>Saldo</th>
            <th>Estoque Atual</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={item.lowStock ? styles.lowStockRow : ""}>
              <td>{item.product}</td>
              <td>{item.purchased}</td>
              <td>{item.sold}</td>
              <td>{item.purchased - item.sold}</td>
              <td>{item.currentStock}</td>
              <td>
                {item.lowStock ? (
                  <span className={styles.warning}>Baixo Estoque</span>
                ) : (
                  <span className={styles.ok}>Disponível</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
