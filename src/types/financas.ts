export interface FinancaData {
  tipo: "Investimento" | "Despesa";
  origem: string;
  descricao: string;
  data: string;
  status: "Pago" | "Pendente";
  valor: number;
}
