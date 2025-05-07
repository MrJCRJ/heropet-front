import { ReactNode } from "react";
import LoadingSpinner from "../LoadingSpinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
}: ButtonProps) => {
  // Configurações de estilo
  const baseStyles =
    "rounded-md transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 focus:ring-gray-300",
    link: "bg-transparent hover:underline text-blue-600 p-0 focus:ring-0",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${
          disabled || loading
            ? "opacity-70 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${fullWidth ? "w-full" : ""}
        ${variant === "link" ? "inline-flex" : "inline-flex"}
        ${className}
      `}
    >
      {loading && <LoadingSpinner size={size} />}
      {children}
    </button>
  );
};

Button.displayName = "Button";
