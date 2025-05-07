import { FormBasicsProps } from "./types";
import { FormSelect } from "./FormSelect";

export const PaymentDeliverySection = ({
  formData,
  handleChange,
}: Pick<FormBasicsProps, "formData" | "handleChange">) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormSelect
      name="formaPagamento"
      label="Forma de Pagamento"
      value={formData.formaPagamento || ""}
      onChange={handleChange}
      options={[
        { value: "", label: "Selecione..." },
        { value: "DINHEIRO", label: "Dinheiro" },
        { value: "CARTAO_CREDITO", label: "Cartão de Crédito" },
        { value: "CARTAO_DEBITO", label: "Cartão de Débito" },
        { value: "PIX", label: "PIX" },
        { value: "BOLETO", label: "Boleto" },
        { value: "TRANSFERENCIA", label: "Transferência" },
      ]}
    />

    <FormSelect
      name="formaEntrega"
      label="Forma de Entrega"
      value={formData.formaEntrega || ""}
      onChange={handleChange}
      options={[
        { value: "", label: "Selecione..." },
        { value: "RETIRADA", label: "Retirada" },
        { value: "ENTREGA", label: "Entrega" },
        { value: "CORREIOS", label: "Correios" },
        { value: "TRANSPORTADORA", label: "Transportadora" },
      ]}
    />
  </div>
);
