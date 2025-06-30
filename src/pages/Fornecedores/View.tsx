import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarFornecedor,
  removerFornecedor,
  buscarEnderecoPorCep,
} from "../../api/fornecedores";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { DetailCard } from "../../components/ui/DetailCard/DetailCard";
import { formatCNPJ, formatCEP, formatPhone } from "../../utils/masks";
import { Fornecedor } from "../../types/fornecedores";

const FornecedorView = () => {
  const { cnpj } = useParams<{ cnpj: string }>();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [addressFromCep, setAddressFromCep] = useState<{
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  } | null>(null);

  // Função para buscar endereço pelo CEP
  const fetchAddressByCep = async (cep: string) => {
    try {
      setLoadingCep(true);
      const endereco = await buscarEnderecoPorCep(cep);
      setAddressFromCep({
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
      });
    } catch (err) {
      console.error("Erro ao buscar endereço:", err);
      setAddressFromCep(null);
    } finally {
      setLoadingCep(false);
    }
  };

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        if (!cnpj) throw new Error("CNPJ não fornecido");

        setLoading(true);
        setError(null);

        const response = await buscarFornecedor(cnpj);
        const fornecedorData = response.data;

        // Busca automática do endereço se tiver CEP
        if (fornecedorData.endereco?.cep) {
          await fetchAddressByCep(fornecedorData.endereco.cep);
        }

        setFornecedor(fornecedorData);
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
        <DetailCard.Row
          label="CNPJ"
          value={fornecedor.cnpj ? formatCNPJ(fornecedor.cnpj) : ""}
        />
        <DetailCard.Row label="Nome" value={fornecedor.nome} />
        <DetailCard.Row label="Nome Fantasia" value={fornecedor.nomeFantasia} />
        <DetailCard.Row label="Email" value={fornecedor.email} />
        <DetailCard.Row
          label="Telefone"
          value={fornecedor.telefone ? formatPhone(fornecedor.telefone) : ""}
        />
      </DetailCard>

      {(fornecedor.endereco || loadingCep) && (
        <DetailCard title="Endereço" className="mt-6">
          {loadingCep ? (
            <div className="flex justify-center py-4">
              <LoadingSpinner size="md" />
              <span className="ml-2">Buscando endereço...</span>
            </div>
          ) : (
            <>
              <DetailCard.Row
                label="CEP"
                value={
                  fornecedor.endereco?.cep
                    ? formatCEP(fornecedor.endereco.cep)
                    : ""
                }
              />

              {/* Mostra os dados do endereço do fornecedor ou os buscados pelo CEP */}
              <DetailCard.Row
                label="Logradouro"
                value={
                  addressFromCep?.logradouro ||
                  fornecedor.endereco?.logradouro ||
                  "Não informado"
                }
              />
              <DetailCard.Row
                label="Bairro"
                value={
                  addressFromCep?.bairro ||
                  fornecedor.endereco?.bairro ||
                  "Não informado"
                }
              />
              <DetailCard.Row
                label="Cidade"
                value={
                  addressFromCep?.localidade ||
                  fornecedor.endereco?.localidade ||
                  "Não informado"
                }
              />
              <DetailCard.Row
                label="UF"
                value={
                  addressFromCep?.uf ||
                  fornecedor.endereco?.uf ||
                  "Não informado"
                }
              />

              {/* Campos que não são preenchidos pelo CEP */}
              <DetailCard.Row
                label="Número"
                value={fornecedor.endereco?.numero || "Não informado"}
              />
              <DetailCard.Row
                label="Complemento"
                value={fornecedor.endereco?.complemento || "Não informado"}
              />
            </>
          )}
        </DetailCard>
      )}
    </div>
  );
};

export default FornecedorView;
