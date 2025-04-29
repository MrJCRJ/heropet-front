import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarFornecedor,
  Fornecedor,
  removerFornecedor,
} from "../../../api/fornecedores";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import DetailCard from "../../../components/DetailCard";

const FornecedorView = () => {
  const { cnpj } = useParams<{ cnpj: string }>();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        if (!cnpj) throw new Error("CNPJ não fornecido");

        setLoading(true);
        setError(null);

        const response = await buscarFornecedor(cnpj);
        setFornecedor(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar fornecedor"
        );
      } finally {
        setLoading(false);
      }
    };

    carregarFornecedor();
  }, [cnpj]);

  const handleDelete = async () => {
    if (
      !cnpj ||
      !window.confirm("Tem certeza que deseja excluir este fornecedor?")
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      await removerFornecedor(cnpj);
      navigate("/fornecedores", {
        state: {
          success: true,
          message: "Fornecedor excluído com sucesso!",
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir fornecedor"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/fornecedores/${cnpj}/editar`);
  };

  const handleBack = () => {
    navigate("/fornecedores");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          type="error"
          message={error}
          actions={
            <Button variant="secondary" onClick={handleBack}>
              Voltar
            </Button>
          }
        />
      </div>
    );
  }

  if (!fornecedor) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          type="info"
          message="Fornecedor não encontrado"
          actions={
            <Button variant="secondary" onClick={handleBack}>
              Voltar
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Detalhes do Fornecedor
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={handleEdit}>
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Excluir
          </Button>
          <Button variant="secondary" onClick={handleBack}>
            Voltar
          </Button>
        </div>
      </div>

      <DetailCard title="Informações Básicas">
        <DetailCard.Row label="CNPJ" value={fornecedor.cnpj} />
        <DetailCard.Row label="Nome" value={fornecedor.nome} />
        <DetailCard.Row label="Nome Fantasia" value={fornecedor.nomeFantasia} />
        <DetailCard.Row label="Email" value={fornecedor.email} />
        <DetailCard.Row label="Telefone" value={fornecedor.telefone} />
      </DetailCard>

      {fornecedor.endereco && (
        <DetailCard title="Endereço" className="mt-6">
          <DetailCard.Row label="CEP" value={fornecedor.endereco.cep} />
          <DetailCard.Row
            label="Logradouro"
            value={fornecedor.endereco.logradouro}
          />
          <DetailCard.Row label="Número" value={fornecedor.endereco.numero} />
          <DetailCard.Row
            label="Complemento"
            value={fornecedor.endereco.complemento}
          />
          <DetailCard.Row label="Bairro" value={fornecedor.endereco.bairro} />
          <DetailCard.Row
            label="Cidade"
            value={fornecedor.endereco.localidade}
          />
          <DetailCard.Row label="UF" value={fornecedor.endereco.uf} />
        </DetailCard>
      )}
    </div>
  );
};

export default FornecedorView;
