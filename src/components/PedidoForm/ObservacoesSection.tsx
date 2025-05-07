import { FormBasicsProps } from "./types";

export const ObservacoesSection = ({
  formData,
  handleChange,
}: Pick<FormBasicsProps, "formData" | "handleChange">) => (
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
);
