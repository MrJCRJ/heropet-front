// src/pages/Home/SalaryEvolution/constants.ts
export const INITIAL_DATA = {
  investment: {
    you: 3400.6,
    partner: 1954,
    total: 3400.6 + 1954,
    food: 4954,
    printer: 400.6,
  },
  aprilProfit: 453.2,
};

export const LEGEND_ITEMS = [
  { term: "Venda do mês", definition: "Total de vendas no período" },
  { term: "Salário Vendedor", definition: "7% do total de vendas" },
  { term: "Despesas fixas", definition: "R$0 Precisa ser informado" },
  {
    term: "Despesas variáveis",
    definition: "Inclui custos eventais como a impressora",
  },
  { term: "Lucro", definition: "Vendas - Salário - Todas despesas" },
  { term: "Sócios", definition: "25% do lucro para cada sócio" },
  { term: "Reserva", definition: "Valor restante para a empresa" },
];
