import { useState, ChangeEvent, FormEvent } from "react";
import { formatarData } from "../pages/Pedidos/pedidoUtils";

interface FinancaFormData {
  tipo: "Investimento" | "Despesa";
  origem: string;
  descricao: string;
  data: string;
  status: "Pago" | "Pendente";
  valor: string; // Mantido como string para o campo de input
}

interface FinancaFormProps {
  onSubmit: (
    formData: Omit<FinancaFormData, "valor"> & { valor: number }
  ) => void;
}

export const FinancaForm = ({ onSubmit }: FinancaFormProps) => {
  const [formData, setFormData] = useState<FinancaFormData>({
    tipo: "Investimento",
    origem: "",
    descricao: "",
    data: formatarData(new Date().toISOString()), // Convertendo Date para string
    status: "Pago",
    valor: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      valor: parseFloat(formData.valor.replace(",", ".")) || 0, // Convertendo para número
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Investimento">Investimento</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Origem
          </label>
          <input
            type="text"
            name="origem"
            value={formData.origem}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Pago">Pago</option>
            <option value="Pendente">Pendente</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor (R$)
          </label>
          <input
            type="text"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="0,00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Salvar Finança
        </button>
      </div>
    </form>
  );
};
