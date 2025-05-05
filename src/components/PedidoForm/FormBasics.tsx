import { useCallback } from "react";
import { Pedido } from "../../pages/Home/types/pedidos";
import { useClientesFornecedores } from "./useClientesFornecedores";
import { ClienteFornecedorSelect } from "./ClienteFornecedorSelect";
import { formatDateForInput, formatDocumento } from "./utils";

interface FormBasicsProps {
  formData: Omit<Pedido, "_id">;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
}

export const FormBasics = ({
  formData,
  isEditing,
  handleChange,
  setFormData,
}: FormBasicsProps) => {
  const { fornecedores, clientes, loading, error } = useClientesFornecedores(
    formData.tipo
  );

  const limparCampos = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      nomeClienteFornecedor: "",
      documentoClienteFornecedor: "",
    }));
  }, [setFormData]);

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    limparCampos();
  };

  const handleSelectClienteFornecedor = (nome: string, documento: string) => {
    setFormData((prev) => ({
      ...prev,
      nomeClienteFornecedor: nome,
      documentoClienteFornecedor: documento,
    }));
  };

  const items =
    formData.tipo === "COMPRA"
      ? fornecedores.map((f) => ({ nome: f.nome, documento: f.cnpj }))
      : clientes.map((c) => ({ nome: c.nome, documento: c.cpfOuCnpj }));

  return (
    <div className="space-y-6">
      {/* Seções de erro e loading */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando dados...</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Informações Básicas
        </h3>

        {/* Tipo de Pedido e Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de Pedido */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Pedido
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleTipoChange}
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={isEditing}
            >
              <option value="VENDA">Venda</option>
              <option value="COMPRA">Compra</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="PENDENTE">Pendente</option>
              <option value="PROCESSANDO">Processando</option>
              <option value="PAGO">Pago</option>
              <option value="CANCELADO">Cancelado</option>
              <option value="ATRASADO">Atrasado</option>
            </select>
          </div>
        </div>

        {/* Documento e Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Documento
            </label>
            <input
              type="text"
              name="documentoClienteFornecedor"
              value={formatDocumento(formData.documentoClienteFornecedor)}
              onChange={handleChange}
              required
              disabled={true}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
            />
          </div>

          <ClienteFornecedorSelect
            tipo={formData.tipo}
            value={formData.nomeClienteFornecedor}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, nomeClienteFornecedor: value }))
            }
            onSelect={handleSelectClienteFornecedor}
            disabled={isEditing}
            items={items}
            loading={loading}
          />
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Data do Pedido
            </label>
            <input
              type="date"
              name="dataPedido"
              value={formatDateForInput(formData.dataPedido)}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Data de Entrega
            </label>
            <input
              type="date"
              name="dataEntrega"
              value={formatDateForInput(formData.dataEntrega || "")}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Data de Pagamento
            </label>
            <input
              type="date"
              name="dataPagamento"
              value={formatDateForInput(formData.dataPagamento || "")}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Formas de Pagamento e Entrega */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Forma de Pagamento
            </label>
            <select
              name="formaPagamento"
              value={formData.formaPagamento || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="CARTAO_CREDITO">Cartão de Crédito</option>
              <option value="CARTAO_DEBITO">Cartão de Débito</option>
              <option value="PIX">PIX</option>
              <option value="BOLETO">Boleto</option>
              <option value="TRANSFERENCIA">Transferência</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Forma de Entrega
            </label>
            <select
              name="formaEntrega"
              value={formData.formaEntrega || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="RETIRADA">Retirada</option>
              <option value="ENTREGA">Entrega</option>
              <option value="CORREIOS">Correios</option>
              <option value="TRANSPORTADORA">Transportadora</option>
            </select>
          </div>
        </div>

        {/* Campos específicos para VENDA */}
        {formData.tipo === "VENDA" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Vendedor
                </label>
                <input
                  type="text"
                  name="vendedor"
                  value={formData.vendedor || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Transportadora
                </label>
                <input
                  type="text"
                  name="transportadora"
                  value={formData.transportadora || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Prazo de Pagamento (dias)
                </label>
                <input
                  type="number"
                  name="prazoPagamento"
                  value={formData.prazoPagamento || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Desconto (%)
                </label>
                <input
                  type="number"
                  name="desconto"
                  value={formData.desconto || ""}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Condições de Pagamento
                </label>
                <select
                  name="condicaoPagamento"
                  value={formData.condicaoPagamento || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="A_VISTA">À Vista</option>
                  <option value="PRAZO_30">30 dias</option>
                  <option value="PRAZO_60">60 dias</option>
                  <option value="PARCELADO">Parcelado</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Nota Fiscal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="temNotaFiscal"
              checked={formData.temNotaFiscal}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  temNotaFiscal: e.target.checked,
                }));
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Tem Nota Fiscal?
            </label>
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Observações
          </label>
          <textarea
            name="observacoes"
            value={formData.observacoes || ""}
            onChange={handleChange}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Informações adicionais sobre o pedido"
          />
        </div>
      </div>
    </div>
  );
};

export default FormBasics;
