// pedidos.types.ts
import { EstoqueHistorico } from "./estoque";
import { ReactNode } from "react";

export const OrdenacaoValues = ["data_asc", "data_desc"] as const;
export type OrdenacaoPedido = (typeof OrdenacaoValues)[number];

export const FiltroStatusValues = [
  "PENDENTE",
  "PROCESSANDO",
  "PAGO",
  "CANCELADO",
  "ATRASADO",
] as const;
export type FiltroStatus = (typeof FiltroStatusValues)[number];

export interface ListarPedidosParams {
  tipo?: "VENDA" | "COMPRA" | "TODOS";
  status?: FiltroStatus;
  ordenacao?: OrdenacaoPedido;
  mes?: number;
  ano?: number;
  page?: number;
  limit?: number;
}

export interface PeriodFilter {
  type: "month" | "year";
  month?: number;
  year: number;
}

// types.ts
export type FiltroPedido = "TODOS" | "VENDA" | "COMPRA";

export type PedidoListProps = {
  pedidos: Pedido[];
  loading: boolean;
  error: string;
  pedidoParaExcluir: string | null;
  isDeleting: boolean;
  filtroAtivo: FiltroPedido;
  onDeleteClick: (pedidoId: string) => void;
  onFilterChange: (tipo?: FiltroPedido) => void;
};

// types.ts
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  precoUnitario: number;
  estoqueMinimo: number;
  codigoBarras?: string;
  categoria?: string;
}

export type PedidoTableProps = {
  pedidos: Pedido[];
  ordenacao: OrdenacaoPedido;
  filtroTipo: FiltroPedido;
  filtroStatus?: FiltroStatus;
  selectedMonth?: number;
  selectedYear?: number;
  onOrdenarClick: () => void;
  onFilterChange: (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    ordem?: OrdenacaoPedido,
    mes?: number,
    ano?: number
  ) => void;
};

export type PedidoRowProps = {
  pedido: Pedido;
};

// types/pedidoTypes.ts
export type PedidoStatus =
  | "PENDENTE"
  | "PROCESSANDO"
  | "PAGO"
  | "CANCELADO"
  | "ATRASADO";

export interface ItemPedido {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

export interface Parcela {
  numero: number;
  dataVencimento: string;
  valor: number;
  pago: boolean;
}

export interface Pedido {
  _id?: string;
  tipo: "VENDA" | "COMPRA";
  status: PedidoStatus; // Alterado de string para PedidoStatus
  documentoClienteFornecedor: string;
  nomeClienteFornecedor: string;
  dataPedido: string;
  dataEntrega?: string;
  itens: ItemPedido[];
  totalPedido: number;
  temNotaFiscal: boolean;
  observacoes?: string;
  parcelas?: Parcela[];
  condicaoPagamento?: string;
}

export interface ItensPedidoViewProps {
  itens: ItemPedido[];
  totalPedido: number;
}

export interface Financa {
  id: string;
  tipo: "Investimento" | "Despesa";
  valor: number;
  data: string;
  descricao: string;
  // ... outros campos conforme necessário
}

// Tipos para o hook de cálculos financeiros
export interface FinancialCalculationsResult {
  total: number;
  totalAPagar: number;
  totalAReceber: number;
  totalVendas: number;
  totalCompras: number;
  totalInvestimentos: number;
  totalDespesas: number;
  saldoOperacoes: number;
  saldoCustos: number;
  saldoGeral: number;
}

export interface FinancaData {
  _id: string; // Ou qualquer campo que seja o ID na API
  tipo: string;
  valor: number;
  data: string;
  descricao?: string;
  // Outros campos da API
}

export interface ParcelasViewProps {
  parcelas: Parcela[];
  onTogglePago: (numero: number) => void;
  onRemoveTodasParcelas?: () => void; // Nova prop para remover todas
  isEditing?: boolean;
}

export interface FinancialSummaryProps {
  pedidos: Pedido[];
  filtroTipo: FiltroPedido;
}

export interface ConsolidatedResultProps {
  saldoGeral: number;
  saldoOperacoes: number;
  saldoCustos: number;
  totalVendas: number;
  totalInvestimentos: number;
  totalCompras: number;
  totalDespesas: number;
}

export interface OrderBalanceProps {
  total: number;
  totalVendas: number;
  totalCompras: number;
}

export interface PendingReceivablesProps {
  totalAReceber: number;
}

export interface PendingPayablesProps {
  totalAPagar: number;
}

export interface Financa {
  id: string;
  tipo: "Investimento" | "Despesa";
  valor: number;
  data: string;
  descricao: string;
  // ... outros campos conforme necessário
}

export interface EstoqueSummaryProps {
  pedidos: Pedido[];
}

export interface ProdutoResumo {
  nome: string;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
  vendas: number;
}

export type FilterChangeHandler = (
  tipo?: FiltroPedido,
  status?: FiltroStatus,
  ordem?: OrdenacaoPedido,
  mes?: number,
  ano?: number
) => void;

export type DateFilterProps = {
  show: boolean;
  selectedMonth?: number;
  selectedYear?: number;
  onFilterChange: (month?: number, year?: number) => void;
  onClose: () => void;
};

export type TypeFilterProps = {
  show: boolean;
  currentFilter?: FiltroPedido;
  onFilterChange: (tipo: FiltroPedido) => void;
  onClose: () => void;
};

export type StatusFilterProps = {
  show: boolean;
  currentFilter?: FiltroStatus;
  onFilterChange: (status?: FiltroStatus) => void;
  onClose: () => void;
};

export interface FormInputProps {
  type: string;
  name: string;
  label: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
}

export interface FormItemsProps {
  formData: Omit<Pedido, "_id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  hasParcelamento: boolean;
  setHasParcelamento: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormParcelamentoProps {
  totalPedido: number;
  dataPedido: string;
  quantidadeParcelas: number;
  setQuantidadeParcelas: (value: number) => void;
  parcelamentoSemanal: boolean;
  setParcelamentoSemanal: (value: boolean) => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  name: string;
  label: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FormSelectOption[];
  disabled?: boolean;
}

export interface PedidoFormProps {
  initialData?: Omit<Pedido, "_id">;
  onSubmit: (pedido: Omit<Pedido, "_id">) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

export interface ItemsTableProps {
  items: ItemPedido[];
  removerItem: (index: number) => void;
  totalPedido: number;
}

export interface ParcelamentoControlsProps {
  quantidadeParcelas: number;
  setQuantidadeParcelas: (value: number) => void;
  parcelamentoSemanal: boolean;
  setParcelamentoSemanal: (value: boolean) => void;
}

export interface Parcela {
  numero: number;
  dataVencimento: string;
  valor: number;
}

export interface ParcelaPreviewProps {
  parcelas: Parcela[];
}

export interface ProductDropdownProps {
  mostrarDropdown: boolean;
  termoBusca: string;
  estoqueFiltrado: EstoqueHistorico[];
  produtoNaoEncontrado: boolean;
  toggleDropdown: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selecionarProduto: (produto: EstoqueHistorico) => void;
  usarProdutoDigitado: () => void;
}

export interface SuggestionItem {
  nome?: string;
  documento: string;
}

export interface SuggestionListProps {
  suggestions: SuggestionItem[];
  onSelect: (item: SuggestionItem) => void;
  visible: boolean;
}

export interface ParceiroResumo {
  nome: string;
  documento: string;
  totalTransacionado: number;
  quantidadeTotal: number;
  pedidosCount: number;
  produtos: Record<string, { quantidade: number; total: number }>;
  tipo: "CLIENTE" | "FORNECEDOR";
}

export interface ParceirosSummaryProps {
  pedidos: Pedido[];
}

export interface TooltipEstoqueCompletoProps {
  produtos: ProdutoResumo[];
  quantidadeTotal: number;
  maxItems?: number;
}

export interface ResumoCardProps {
  titulo: string;
  valor: number;
  cor: "blue" | "gray" | "red" | "yellow";
  icone: "cube" | "warning";
  tooltip: ReactNode;
  conteudoAdicional?: ReactNode;
  isMonetary?: boolean;
}
