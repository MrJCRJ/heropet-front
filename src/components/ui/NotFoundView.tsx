// src/components/ui/NotFoundView.tsx
import { Link } from "react-router-dom";
import { Alert } from "./Alert";

interface NotFoundViewProps {
  message?: string;
  backLink?: string;
  backLabel?: string;
}

export const NotFoundView = ({
  message = "Recurso não encontrado",
  backLink = "/",
  backLabel = "Voltar",
}: NotFoundViewProps) => (
  <div className="max-w-4xl mx-auto p-4">
    <Alert
      type="info"
      message={message}
      actions={
        <Link
          to={backLink}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {backLabel}
        </Link>
      }
    />
  </div>
);
