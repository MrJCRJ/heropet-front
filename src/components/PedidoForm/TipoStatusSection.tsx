import React from "react";
import { FormBasicsProps } from "./types";
import { FormSelect } from "./FormSelect";

export const TipoStatusSection = ({
  formData,
  isEditing,
  handleChange,
  handleTipoChange,
}: Pick<FormBasicsProps, "formData" | "isEditing" | "handleChange"> & {
  handleTipoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormSelect
      name="tipo"
      label="Tipo de Pedido"
      value={formData.tipo}
      onChange={handleTipoChange}
      disabled={isEditing}
      options={[
        { value: "VENDA", label: "Venda" },
        { value: "COMPRA", label: "Compra" },
      ]}
    />

    <FormSelect
      name="status"
      label="Status"
      value={formData.status}
      onChange={handleChange}
      options={[
        { value: "PENDENTE", label: "Pendente" },
        { value: "PROCESSANDO", label: "Processando" },
        { value: "PAGO", label: "Pago" },
        { value: "CANCELADO", label: "Cancelado" },
        { value: "ATRASADO", label: "Atrasado" },
      ]}
    />
  </div>
);
