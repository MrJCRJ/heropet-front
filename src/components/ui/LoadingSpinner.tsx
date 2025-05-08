// src/components/ui/LoadingSpinner.tsx
import { cva, type VariantProps } from "class-variance-authority";

// Definindo variantes com class-variance-authority (CVA)
const spinnerVariants = cva(
  "animate-spin rounded-full border-4 border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-4 w-4 border-2",
        sm: "h-5 w-5",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16 border-6",
      },
      variant: {
        primary: "border-blue-500",
        secondary: "border-gray-400",
        success: "border-green-500",
        danger: "border-red-500",
        warning: "border-yellow-500",
      },
      speed: {
        slow: "animate-[spin_1.5s_linear_infinite]",
        normal: "animate-[spin_1s_linear_infinite]",
        fast: "animate-[spin_0.5s_linear_infinite]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      speed: "normal",
    },
  }
);

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string;
  label?: string;
};

export const LoadingSpinner = ({
  size,
  variant,
  speed,
  className,
  label = "Carregando...",
}: SpinnerProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-2">
      <div className={spinnerVariants({ size, variant, speed, className })}>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
};

// Para manter compatibilidade com imports existentes
export default LoadingSpinner;
