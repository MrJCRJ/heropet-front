// src/pages/Home/SalaryEvolution/utils.ts
import { MonthlySalaryData, InitialData } from "./types";

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const calculateSalesTarget = (totalInvestment: number) => {
  return Math.round((totalInvestment * 1.2) / 6);
};

export const calculateProjections = (
  initialData: InitialData,
  salesTarget: number
): MonthlySalaryData[] => {
  const projections: MonthlySalaryData[] = [];
  const months = [
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Calcula a porcentagem de lucro em abril (base real)
  const aprilProfitPercentage =
    initialData.aprilProfit / (initialData.aprilProfit / 0.178); // Lucro / Vendas

  const variationFactors = [0, 0.1, 0.05, -0.03, 0.15, 0.08, -0.05, 0.12, 0.1];
  let currentSale = initialData.aprilProfit / 0.178; // Vendas de abril calculadas a partir do lucro
  const fixedExpenses = 50;

  months.forEach((month, index) => {
    if (index > 0) {
      const variation = variationFactors[index];
      currentSale = Math.round(currentSale * (1 + variation));
    }

    const sellerSalary = currentSale * 0.07;
    let expenses = 0;

    if (month === "Abril") {
      expenses = 0;
    } else if (month === "Maio") {
      expenses = fixedExpenses + initialData.investment.printer;
    } else {
      expenses = fixedExpenses;
    }

    // Calcula o lucro mantendo a mesma porcentagem de abril
    const profit = currentSale * aprilProfitPercentage;
    const managerShare = profit * 0.25;
    const finalAmount = profit - managerShare * 2;
    const cumulativeInvestment = initialData.investment.total;
    const returnOnInvestment = (profit / cumulativeInvestment) * 100;

    projections.push({
      month: `${month} 2025`,
      sale: currentSale,
      sellerSalary,
      profit,
      manager1: managerShare,
      manager2: managerShare,
      expenses,
      finalAmount,
      cumulativeInvestment,
      returnOnInvestment,
      salesTarget,
      fixedExpenses: month === "Abril" ? 0 : fixedExpenses,
      variableExpenses: month === "Maio" ? initialData.investment.printer : 0,
    });
  });

  return projections;
};
