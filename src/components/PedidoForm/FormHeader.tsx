interface FormHeaderProps {
  isEditing: boolean;
  className?: string;
}

const FormHeader = ({ isEditing, className = "" }: FormHeaderProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-2xl font-bold text-gray-800">
        {isEditing ? "Editar Pedido" : "Criar Novo Pedido"}
      </h1>
      <div className="mt-2 border-b border-gray-200"></div>
    </div>
  );
};

export default FormHeader;
