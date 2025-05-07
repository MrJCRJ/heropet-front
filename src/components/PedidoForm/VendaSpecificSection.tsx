import { FormBasicsProps } from "./types";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export const VendaSpecificSection = ({
  formData,
  handleChange,
}: Pick<FormBasicsProps, "formData" | "handleChange">) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        type="text"
        name="vendedor"
        label="Vendedor"
        value={formData.vendedor || ""}
        onChange={handleChange}
      />

      <FormInput
        type="text"
        name="transportadora"
        label="Transportadora"
        value={formData.transportadora || ""}
        onChange={handleChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormInput
        type="number"
        name="prazoPagamento"
        label="Prazo de Pagamento (dias)"
        value={formData.prazoPagamento || ""}
        onChange={handleChange}
      />

      <FormInput
        type="number"
        name="desconto"
        label="Desconto (%)"
        value={formData.desconto || ""}
        onChange={handleChange}
        min="0"
        max="100"
        step="0.01"
      />

      <FormSelect
        name="condicaoPagamento"
        label="Condições de Pagamento"
        value={formData.condicaoPagamento || ""}
        onChange={handleChange}
        options={[
          { value: "", label: "Selecione..." },
          { value: "A_VISTA", label: "À Vista" },
          { value: "PRAZO_30", label: "30 dias" },
          { value: "PRAZO_60", label: "60 dias" },
          { value: "PARCELADO", label: "Parcelado" },
        ]}
      />
    </div>
  </>
);
