import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarFornecedor,
  atualizarFornecedor,
  type Fornecedor,
} from "../../../api/fornecedores";
import FornecedorForm from "../../../components/FornecedorForm";
import styles from "./styles.module.css";

const FornecedorEditPage = () => {
  const { cnpj } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        if (!cnpj) throw new Error("CNPJ não fornecido");
        const response = await buscarFornecedor(cnpj);
        setInitialData(response.data);
      } catch (err) {
        setError("Erro ao carregar fornecedor");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarFornecedor();
  }, [cnpj]);

  const handleSubmit = async (formData: Fornecedor) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!cnpj) throw new Error("CNPJ não fornecido");
      await atualizarFornecedor(cnpj, formData);
      navigate(`/fornecedores/${cnpj}`, { state: { updated: true } });
    } catch (err) {
      setError("Erro ao atualizar fornecedor");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !initialData) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  if (error) return <div className={styles.error}>{error}</div>;
  if (!initialData) return <div>Fornecedor não encontrado</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Editar Fornecedor</h1>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Voltar
        </button>
      </div>

      <div className={styles.formContainer}>
        <FornecedorForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={true}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default FornecedorEditPage;
