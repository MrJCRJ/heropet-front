import { Pedido } from "../../pages/Pedidos/types";

export interface FormBasicsProps {
  formData: Omit<Pedido, "_id">;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
}

export interface ClienteFornecedorItem {
  nome: string;
  documento: string;
}
