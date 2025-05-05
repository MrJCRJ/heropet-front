export type MonthlySalaryData = {
  month: string;
  sale: number;
  sellerSalary: number;
  profit: number;
  manager1: number;
  manager2: number;
  expenses: number;
  finalAmount: number;
  cumulativeInvestment: number;
  returnOnInvestment: number;
  salesTarget: number;
  fixedExpenses: number;
  variableExpenses: number;
};

export interface SalaryTableProps {
  data: MonthlySalaryData[];
}

export interface SalaryChartProps {
  data: MonthlySalaryData[];
}

export interface MetricsDashboardProps {
  data: MonthlySalaryData[];
  initialData: {
    investment: {
      you: number;
      partner: number;
      total: number;
      printer: number;
    };
    aprilSale: number;
  };
}

export interface InitialInvestmentData {
  you: number;
  partner: number;
  total: number;
  food: number;
  printer: number;
}

export interface InitialData {
  investment: InitialInvestmentData;
  aprilProfit: number;
}

export interface SalaryEvolutionProps {
  data: MonthlySalaryData[];
  initialData: InitialData;
}
