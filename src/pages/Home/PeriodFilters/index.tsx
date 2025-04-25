import { PeriodFilter } from "../../../api/pedidos";
import styles from "./styles.module.css";

interface PeriodFiltersProps {
  filter: PeriodFilter;
  onChange: (newFilter: PeriodFilter) => void;
}

export const PeriodFilters = ({ filter, onChange }: PeriodFiltersProps) => {
  const currentYear = new Date().getFullYear();

  const handleTypeChange = (type: "month" | "year") => {
    onChange({ ...filter, type });
  };

  const handleMonthChange = (month: number) => {
    onChange({ ...filter, month });
  };

  const handleYearChange = (year: number) => {
    onChange({ ...filter, year });
  };

  return (
    <div className={styles.filtersContainer}>
      <button
        onClick={() => handleTypeChange("month")}
        className={`${styles.filterButton} ${
          filter.type === "month" ? styles.activeFilter : ""
        }`}
      >
        Mês
      </button>
      <button
        onClick={() => handleTypeChange("year")}
        className={`${styles.filterButton} ${
          filter.type === "year" ? styles.activeFilter : ""
        }`}
      >
        Ano
      </button>

      {filter.type === "month" && (
        <select
          value={filter.month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className={styles.filterSelect}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(2000, month - 1, 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      )}

      <select
        value={filter.year}
        onChange={(e) => handleYearChange(Number(e.target.value))}
        className={styles.filterSelect}
      >
        {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
