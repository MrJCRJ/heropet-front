import { FormBasicsProps } from "../../types/cliente";

export const NotaFiscalSection = ({
  formData,
  setFormData,
}: Pick<FormBasicsProps, "formData" | "setFormData">) => (
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
);
