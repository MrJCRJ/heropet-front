import { FormBasicsProps } from "./types";
import { formatDateForInput } from "./utils";
import { FormInput } from "./FormInput";

export const DateSection = ({
  formData,
  handleChange,
}: Pick<FormBasicsProps, "formData" | "handleChange">) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <FormInput
      type="date"
      name="dataPedido"
      label="Data do Pedido"
      value={formatDateForInput(formData.dataPedido)}
      onChange={handleChange}
      required
    />

    <FormInput
      type="date"
      name="dataEntrega"
      label="Data de Entrega"
      value={formatDateForInput(formData.dataEntrega || "")}
      onChange={handleChange}
    />

    <FormInput
      type="date"
      name="dataPagamento"
      label="Data de Pagamento"
      value={formatDateForInput(formData.dataPagamento || "")}
      onChange={handleChange}
    />
  </div>
);
