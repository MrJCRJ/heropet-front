interface FormHeaderProps {
  isEditing: boolean;
}

const FormHeader = ({ isEditing }: FormHeaderProps) => {
  return <h1>{isEditing ? "Editar Pedido" : "Criar Novo Pedido"}</h1>;
};

export default FormHeader;
