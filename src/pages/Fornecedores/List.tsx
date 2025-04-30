import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listarFornecedores,
  removerFornecedor,
  type Fornecedor,
} from "../../api/fornecedores";
import FornecedorList from "../../components/FornecedorList";

const FornecedorListPage = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (cnpj: string) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await removerFornecedor(cnpj);
        setFornecedores(fornecedores.filter((f) => f.cnpj !== cnpj));
      } catch (err) {
        setError("Erro ao excluir fornecedor");
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 flex-wrap">
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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FornecedorListPage;
