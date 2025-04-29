interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ size = "md" }: LoadingSpinnerProps) => {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${sizes[size]}`}
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default LoadingSpinner;
