import styles from "./styles.module.css";

interface BarChartProps {
  data: Array<{ product: string; purchased: number; sold: number }>;
  labels: string[];
  purchasedData: number[];
  soldData: number[];
}

export const BarChart = ({
  labels,
  purchasedData,
  soldData,
}: BarChartProps) => {
  const maxValue = Math.max(...purchasedData, ...soldData) * 1.2;

  return (
    <div className={styles.barChart}>
      {labels.map((label, index) => (
        <div key={index} className={styles.barItem}>
          <div className={styles.barLabel}>{label}</div>
          <div className={styles.bars}>
            <div
              className={styles.barPurchased}
              style={{ width: `${(purchasedData[index] / maxValue) * 100}%` }}
            >
              {purchasedData[index]}
            </div>
            <div
              className={styles.barSold}
              style={{ width: `${(soldData[index] / maxValue) * 100}%` }}
            >
              {soldData[index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
