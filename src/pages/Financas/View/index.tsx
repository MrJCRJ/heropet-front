import { useParams } from "react-router-dom";
import { useFinanca } from "./useFinanca";
import { Alert } from "../../../components/ui/Alert";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export const FinancaView = () => {
  const { id } = useParams();
  const { loading, error } = useFinanca(id);

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Detalhes da Finança</h1>
      {/* Adicione os detalhes da finança aqui */}
    </div>
  );
};
