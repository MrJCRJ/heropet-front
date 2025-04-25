import { useState } from "react";
import { MockProduct, mockProducts } from "../mockData";
import styles from "./styles.module.css";

const StockHistory = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Evolução de Estoque (Últimos 12 Meses) - Informações apenas para test
      </h2>

      <div className={styles.productsGrid}>
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: MockProduct }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: "", x: 0, y: 0 });

  const currentStock =
    product.monthlyStocks[product.monthlyStocks.length - 1].stock;
  const initialStock = product.initialStock;
  const variation = currentStock - initialStock;

  const handleMouseEnter = (
    month: (typeof product.monthlyStocks)[0],
    index: number,
    e: React.MouseEvent
  ) => {
    const prevMonth =
      index > 0 ? product.monthlyStocks[index - 1].stock : month.stock;
    const diff = month.stock - prevMonth;
    const totalMovement = month.purchases + month.sales;
    const purchasePercentage =
      totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
    const salesPercentage =
      totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;

    setTooltip({
      visible: true,
      content: `
        Mês: ${new Date(2000, month.month - 1, 1).toLocaleString("default", {
          month: "long",
        })}/${month.year}
        Estoque Final: ${month.stock}
        ${diff > 0 ? `Comprou: +${diff}` : `Vendeu: ${diff}`}
        Compras: +${month.purchases} (${purchasePercentage.toFixed(1)}%)
        Vendas: -${month.sales} (${salesPercentage.toFixed(1)}%)
        Variação: ${month.purchases - month.sales > 0 ? "+" : ""}${
        month.purchases - month.sales
      }
      `,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productHeader}>
        <h3>{product.name}</h3>
        <span className={styles.brand}>{product.brand}</span>
      </div>

      <div className={styles.stockSummary}>
        <div className={styles.stockValue}>
          <span>Estoque Atual</span>
          <strong>{currentStock}</strong>
        </div>
        <div
          className={`${styles.stockVariation} ${
            variation >= 0 ? styles.positive : styles.negative
          }`}
        >
          <span>
            {variation >= 0 ? "+" : ""}
            {variation}
          </span>
          <span>desde o início</span>
        </div>
      </div>

      <div className={styles.monthlyChart}>
        {product.monthlyStocks.map((month, index) => {
          const prevMonth =
            index > 0 ? product.monthlyStocks[index - 1].stock : month.stock;
          const diff = month.stock - prevMonth;
          const totalMovement = month.purchases + month.sales;
          const purchasePercentage =
            totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
          const salesPercentage =
            totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;

          return (
            <div
              key={index}
              className={styles.monthBarContainer}
              onMouseEnter={(e) => handleMouseEnter(month, index, e)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.monthLabel}>
                {new Date(2000, month.month - 1, 1).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className={styles.barGroup}>
                {/* Combined bar visualization */}
                {diff > 0 && (
                  <div
                    className={`${styles.bar} ${styles.purchaseBar}`}
                    style={{ height: `${purchasePercentage}%` }}
                  ></div>
                )}
                {diff < 0 && (
                  <div
                    className={`${styles.bar} ${styles.saleBar}`}
                    style={{ height: `${salesPercentage}%` }}
                  ></div>
                )}
                <div
                  className={`${styles.bar} ${styles.stockBar}`}
                  style={{
                    height: `${
                      (prevMonth / (prevMonth + Math.abs(diff))) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
          }}
        >
          {tooltip.content.split("\n").map((line, i) => (
            <div key={i}>{line.trim()}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockHistory;
