// src/components/ui/ErrorView.tsx
import { Link } from "react-router-dom";
import { Alert } from "./Alert";

interface ErrorViewProps {
  error: string;
  backLink?: string;
  backLabel?: string;
}

export const ErrorView = ({
  error,
  backLink = "/",
  backLabel = "Voltar",
}: ErrorViewProps) => (
  <div className="max-w-4xl mx-auto p-4">
    <Alert type="error" message={error} />
    <div className="mt-4">
      <Link
        to={backLink}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {backLabel}
      </Link>
    </div>
  </div>
);
