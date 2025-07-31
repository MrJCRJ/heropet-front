// pedidos.ts
import { EstoqueHistorico } from "./estoque";
import { ReactNode } from "react";

// ======================================
// Seção 1: Tipos Básicos e Enums
// ======================================

export enum PedidoStatus {
  PENDENTE = "PENDENTE",
  PROCESSANDO = "PROCESSANDO",
  PAGO = "PAGO",
  CANCELADO = "CANCELADO",
  ATRASADO = "ATRASADO",
}

export type FiltroPedido = "TODOS" | "VENDA" | "COMPRA";

export const OrdenacaoValues = ["data_asc", "data_desc"] as const;
export type OrdenacaoPedido = (typeof OrdenacaoValues)[number];

export const FiltroStatusValues = Object.values(PedidoStatus);
export type FiltroStatus = PedidoStatus;

// ======================================
// Seção 2: Interfaces Principais
// ======================================

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
  status: PedidoStatus;
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

export interface Financa {
  id: string;
  tipo: "Investimento" | "Despesa";
  valor: number;
  data: string;
  descricao: string;
}

// ======================================
// Seção 3: Tipos para Filtros e Parâmetros
// ======================================

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

// ======================================
// Seção 4: Tipos para Componentes
// ======================================

export interface PedidoListProps {
  pedidos: Pedido[];
  loading: boolean;
  error: string;
  pedidoParaExcluir: string | null;
  isDeleting: boolean;
  filtroAtivo: FiltroPedido;
  onDeleteClick: (pedidoId: string) => void;
  onFilterChange: (tipo?: FiltroPedido) => void;
}

export interface PedidoTableProps {
  pedidos: Pedido[];
  ordenacao: OrdenacaoPedido;
  filtroTipo: FiltroPedido;
  filtroStatus?: FiltroStatus;
  selectedMonth?: number;
  selectedYear?: number;
  onOrdenarClick: () => void;
  onFilterChange: FilterChangeHandler;
}

export interface PedidoRowProps {
  pedido: Pedido;
}

export interface ParcelaPreviewProps {
  parcelas: Parcela[];
  onDateChange: (parcelaNumero: number, newDate: string) => void;
}

export interface ItensPedidoViewProps {
  itens: ItemPedido[];
  totalPedido: number;
}

export interface ParcelasViewProps {
  parcelas: Parcela[];
  onTogglePago: (numero: number) => void;
  onRemoveTodasParcelas?: () => void;
  isEditing?: boolean;
}

// ======================================
// Seção 5: Tipos para Formulários
// ======================================

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
}

export interface FormParcelamentoProps {
  quantidadeParcelas: number;
  setQuantidadeParcelas: (value: number) => void;
  parcelas: Parcela[];
  onDateChange: (parcelaNumero: number, newDate: string) => void;
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

// ======================================
// Seção 6: Tipos para Resumos Financeiros
// ======================================

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

export interface BalanceSummaryProps {
  total: number;
  totalVendas: number;
  totalCompras: number;
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

export interface PendingPayablesProps {
  totalAPagar: number;
}

export interface PendingReceivablesProps {
  totalAReceber: number;
}

// ======================================
// Seção 7: Tipos para Autocomplete e UI
// ======================================

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

// ======================================
// Seção 8: Tipos para Handlers e Utilitários
// ======================================

export type FilterChangeHandler = (
  tipo?: FiltroPedido,
  status?: FiltroStatus,
  ordem?: OrdenacaoPedido,
  mes?: number,
  ano?: number
) => void;

export interface DateFilterProps {
  show: boolean;
  selectedMonth?: number;
  selectedYear?: number;
  onFilterChange: (month?: number, year?: number) => void;
  onClose: () => void;
}

export interface TypeFilterProps {
  show: boolean;
  currentFilter?: FiltroPedido;
  onFilterChange: (tipo: FiltroPedido) => void;
  onClose: () => void;
}

export interface StatusFilterProps {
  show: boolean;
  currentFilter?: FiltroStatus;
  onFilterChange: (status?: FiltroStatus) => void;
  onClose: () => void;
}

// ======================================
// Seção 9: Tipos para Resumos de Parceiros
// ======================================

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

// ======================================
// Seção 10: Tipos para Componentes de UI
// ======================================

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

export interface ProdutoResumo {
  nome: string;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
  vendas: number;
  vendasUltimos90Dias?: Record<string, number>; // Alterado de number para Record<string, number>
  estoqueMinimo?: number;
}

export interface EstoqueSummaryProps {
  pedidos: Pedido[];
}

export type TableHeaderProps = {
  showTipoFilter: boolean;
  setShowTipoFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showStatusFilter: boolean;
  setShowStatusFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showDateFilter: boolean;
  setShowDateFilter: React.Dispatch<React.SetStateAction<boolean>>;
  onOrdenarClick: () => void;
  filtroTipo: FiltroPedido;
  filtroStatus?: FiltroStatus;
  ordenacao: string;
  selectedMonth?: number;
  selectedYear?: number;
  getFilterLabel: () => string | null;
  onFilterChange: (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    mes?: number,
    ano?: number
  ) => void;
  statusOptions: readonly StatusOption[];
};

export type StatusOption = {
  readonly valor: string;
  readonly label: string;
};

export const statusOptions = [
  { valor: "PAGO", label: "Pagos" },
  { valor: "PENDENTE", label: "Pendentes" },
  { valor: "CANCELADO", label: "Cancelados" },
  { valor: "PROCESSANDO", label: "Processando" },
  { valor: "ATRASADO", label: "Atrasados" },
] as const;
