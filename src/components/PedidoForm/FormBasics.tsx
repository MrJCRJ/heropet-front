import React, { useCallback } from "react";
import { FormBasicsProps } from "./types";
import { useClientesFornecedores } from "./useClientesFornecedores";
import { LoadingErrorSection } from "./LoadingErrorSection";
import { TipoStatusSection } from "./TipoStatusSection";
import { DocumentoNomeSection } from "./DocumentoNomeSection";
import { DateSection } from "./DateSection";
import { PaymentDeliverySection } from "./PaymentDeliverySection";
import { VendaSpecificSection } from "./VendaSpecificSection";
import { NotaFiscalSection } from "./NotaFiscalSection";
import { ObservacoesSection } from "./ObservacoesSection";

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
      ? fornecedores.map((f) => ({ nome: f.nome || "", documento: f.cnpj }))
      : clientes.map((c) => ({ nome: c.nome || "", documento: c.cpfOuCnpj }));

  return (
    <div className="space-y-6">
      <LoadingErrorSection loading={loading} error={error} />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Informações Básicas
        </h3>

        <TipoStatusSection
          formData={formData}
          isEditing={isEditing}
          handleChange={handleChange}
          handleTipoChange={handleTipoChange}
        />

        <DocumentoNomeSection
          formData={formData}
          isEditing={isEditing}
          items={items}
          loading={loading}
          handleChange={handleChange}
          setFormData={setFormData}
          onSelect={handleSelectClienteFornecedor}
        />

        <DateSection formData={formData} handleChange={handleChange} />

        <PaymentDeliverySection
          formData={formData}
          handleChange={handleChange}
        />

        {formData.tipo === "VENDA" && (
          <VendaSpecificSection
            formData={formData}
            handleChange={handleChange}
          />
        )}

        <NotaFiscalSection formData={formData} setFormData={setFormData} />

        <ObservacoesSection formData={formData} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default FormBasics;
