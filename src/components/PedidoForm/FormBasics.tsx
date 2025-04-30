import { useState, useEffect } from "react";
import { Pedido } from "../../api/pedidos";
import { listarFornecedores, Fornecedor } from "../../api/fornecedores";

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

const FormBasics = ({
  formData,
  isEditing,
  handleChange,
  setFormData,
}: FormBasicsProps) => {
  const [fornecedoresCadastrados, setFornecedoresCadastrados] = useState<
    Fornecedor[]
  >([]);
  const [suggestions, setSuggestions] = useState<Fornecedor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingFornecedores, setIsLoadingFornecedores] = useState(false);

  useEffect(() => {
    const carregarFornecedores = async () => {
      if (isEditing) return;

      setIsLoadingFornecedores(true);
      try {
        const response = await listarFornecedores();
        setFornecedoresCadastrados(response.data);
      } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
      } finally {
        setIsLoadingFornecedores(false);
      }
    };

    carregarFornecedores();
  }, [isEditing]);

  useEffect(() => {
    if (formData.documentoClienteFornecedor && !isEditing) {
      const filtered = fornecedoresCadastrados.filter((fornecedor) =>
        fornecedor.cnpj.includes(formData.documentoClienteFornecedor)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.documentoClienteFornecedor, fornecedoresCadastrados, isEditing]);

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setShowSuggestions(true);
  };

  const selectSuggestion = (fornecedor: Fornecedor) => {
    setFormData((prev) => ({
      ...prev,
      documentoClienteFornecedor: fornecedor.cnpj,
      nomeClienteFornecedor: fornecedor.nome || "",
    }));
    setShowSuggestions(false);
  };

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Handle timezone offset to get correct local date
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  const formatCNPJ = (cnpj: string) => {
    if (!cnpj) return "";
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  return (
    <div className="space-y-6">
      {/* Seção de Informações Básicas */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Informações Básicas
        </h3>

        {/* Tipo de Pedido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Pedido
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
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
              <option value="FINALIZADO">Finalizado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Documento e Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 relative">
            <label className="block text-sm font-medium text-gray-700">
              Documento (CNPJ/CPF)
            </label>
            <div className="relative">
              <input
                type="text"
                name="documentoClienteFornecedor"
                value={formData.documentoClienteFornecedor}
                onChange={handleDocumentoChange}
                required
                disabled={isEditing}
                placeholder="Digite o documento ou selecione um fornecedor"
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
              {isLoadingFornecedores && !isEditing && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>

            {showSuggestions && (
              <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto border border-gray-200">
                {suggestions.map((fornecedor, index) => (
                  <li
                    key={index}
                    onClick={() => selectSuggestion(fornecedor)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex flex-col"
                  >
                    <span className="font-medium">
                      {formatCNPJ(fornecedor.cnpj)}
                    </span>
                    {fornecedor.nome && (
                      <span className="text-gray-500 truncate">
                        {fornecedor.nome}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              name="nomeClienteFornecedor"
              value={formData.nomeClienteFornecedor}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {formData.tipo === "VENDA" && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Data de Entrega
              </label>
              <input
                type="date"
                name="dataEntrega"
                value={formatDateForInput(formData.dataEntrega)}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Outras Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="temNotaFiscal"
              checked={formData.temNotaFiscal}
              onChange={handleChange}
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
