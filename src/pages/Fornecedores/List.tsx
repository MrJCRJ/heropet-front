import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarFornecedores } from "../../api/fornecedores";
import type { Fornecedor } from "../../types/fornecedores";
import FornecedorList from "../../components/fornecedores/FornecedorList";

const FornecedorListPage = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const response = await listarFornecedores();
        setFornecedores(response);
      } catch (err) {
        setError("Erro ao carregar fornecedores");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarFornecedores();
  }, []);

  const handleRowClick = (cnpj: string) => {
    navigate(`/fornecedores/${cnpj}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-800">Fornecedores</h1>
        <div className="flex gap-3 flex-wrap justify-end">
          <Link
            to="/fornecedores/novo"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition-all hover:-translate-y-px shadow-sm hover:shadow-md inline-flex items-center justify-center text-sm"
          >
            Adicionar Fornecedor
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="text-gray-600 text-center py-8">Carregando...</div>
      )}

      {error && (
        <div className="text-red-600 text-center py-4 bg-red-50 rounded-md my-4">
          {error}
        </div>
      )}

      <FornecedorList
        fornecedores={fornecedores}
        isLoading={isLoading}
        error={error}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default FornecedorListPage;
