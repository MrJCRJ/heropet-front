export interface MonthlyStock {
  month: number;
  year: number;
  stock: number;
  purchases: number;
  sales: number;
}

export interface Product {
  id: string;
  name: string;
  currentStock: number;
  monthlyStocks: MonthlyStock[];
}

export interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipContent {
  title: string;
  items: {
    label: string;
    value: string;
    color?: string;
  }[];
}

export interface StockTooltipProps {
  visible: boolean;
  position: TooltipPosition;
  content: TooltipContent;
  offset?: { x: number; y: number };
  maxWidth?: number;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export interface MonthlyChartProps {
  monthlyStocks: MonthlyStock[];
  initialStock: number;
  onMouseEnter: (
    month: MonthlyStock,
    index: number,
    e: React.MouseEvent
  ) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  barWidth?: number;
  chartHeight?: number;
}
