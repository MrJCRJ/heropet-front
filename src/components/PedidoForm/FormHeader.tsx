import clsx from "clsx";

interface FormHeaderProps {
  isEditing: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const FormHeader = ({
  isEditing,
  className = "",
  title,
  subtitle,
}: FormHeaderProps) => {
  const defaultTitle = isEditing ? "Editar Pedido" : "Criar Novo Pedido";
  const headerTitle = title || defaultTitle;

  return (
    <header className={clsx("mb-6", className)}>
      <h1 className="text-2xl font-bold text-gray-800">{headerTitle}</h1>

      {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}

      <div className="mt-2 border-b border-gray-200" aria-hidden="true" />
    </header>
  );
};
