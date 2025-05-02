import { MouseEvent } from "react";

const ChartBar = ({
  type,
  value,
  monthIndex,
  hasData,
  maxValue,
  activeMonth,
  activeType,
  onBarHover,
  colorClass,
}: {
  type: "sales" | "purchases" | "profit";
  value: number;
  monthIndex: number;
  hasData: boolean;
  maxValue: number;
  activeMonth: number | null;
  activeType: "sales" | "purchases" | "profit" | null;
  onBarHover: (
    monthIndex: number,
    type: "sales" | "purchases" | "profit",
    e: MouseEvent
  ) => void;
  colorClass: string;
}) => {
  const isActive =
    (activeMonth === null || activeMonth === monthIndex) &&
    (activeType === null || activeType === type);

  return (
    <div
      className={`w-1/3 rounded-t transition-all duration-200 ${colorClass} ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
      style={{
        height: `${hasData ? (value / maxValue) * 100 : 2}%`,
        cursor: hasData ? "pointer" : "default",
      }}
      onMouseEnter={
        hasData ? (e) => onBarHover(monthIndex, type, e) : undefined
      }
    />
  );
};

export default ChartBar;
