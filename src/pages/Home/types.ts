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

export interface FinancialTransaction {
  id: string;
  date: Date;
  type: "COMPRA" | "VENDA"; // Pode ser expandido para outros tipos depois
  amount: number;
  month: number;
  year: number;
}

export interface MonthlyFinancialData {
  month: number;
  year: number;
  totalSales: number;
  totalPurchases: number;
  profit: number;
  transactions: FinancialTransaction[];
}

export interface FinancialSummary {
  currentBalance: number; // Saldo atual (podemos calcular)
  monthlyData: MonthlyFinancialData[];
  totalSales: number;
  totalPurchases: number;
  totalProfit: number;
}

export interface MonthlyGroup {
  [key: string]: {
    month: number;
    year: number;
    totalSales: number;
    totalPurchases: number;
    transactions: FinancialTransaction[];
  };
}

export interface Pedido {
  _id: string;
  tipo: "VENDA" | "COMPRA";
  dataPedido: string;
  totalPedido: number;
}
