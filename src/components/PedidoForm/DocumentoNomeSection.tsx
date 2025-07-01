import { DocumentoNomeSectionProps } from "../../types/cliente";
import { formatDocumento } from "../../utils/masks";
import { FormInput } from "./FormInput";
import { ClienteFornecedorSelect } from "./ClienteFornecedorSelect";

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
