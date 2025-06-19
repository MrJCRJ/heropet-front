import { FormBasicsProps } from "./types";
import { formatDocumento } from "../../utils/masks";
import { FormInput } from "./FormInput";
import { ClienteFornecedorSelect } from "./ClienteFornecedorSelect";

interface DocumentoNomeSectionProps
  extends Pick<
    FormBasicsProps,
    "formData" | "isEditing" | "setFormData" | "handleChange"
  > {
  items: Array<{ nome: string; documento: string }>;
  loading: boolean;
  onSelect: (nome: string, documento: string) => void;
}

export const DocumentoNomeSection = ({
  formData,
  isEditing,
  items,
  loading,
  handleChange,
  setFormData,
  onSelect,
}: DocumentoNomeSectionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormInput
      type="text"
      name="documentoClienteFornecedor"
      label="Documento"
      value={formatDocumento(formData.documentoClienteFornecedor)}
      onChange={handleChange}
      required
      disabled
    />

    <ClienteFornecedorSelect
      tipo={formData.tipo}
      value={formData.nomeClienteFornecedor}
      onChange={(value) =>
        setFormData((prev) => ({ ...prev, nomeClienteFornecedor: value }))
      }
      onSelect={onSelect}
      disabled={isEditing}
      items={items}
      loading={loading}
    />
  </div>
);
