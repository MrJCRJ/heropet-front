import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarFornecedor,
  Fornecedor,
  Endereco,
  removerFornecedor,
} from "../../../api/fornecedores";
import styles from "./styles.module.css";

const FornecedorView = () => {
  const { cnpj } = useParams();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const endereco: Endereco | undefined = fornecedor?.endereco;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        if (!cnpj) throw new Error("CNPJ não fornecido");
        const response = await buscarFornecedor(cnpj);
        setFornecedor(response.data);
      } catch (err) {
        setError("Erro ao carregar fornecedor");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarFornecedor();
  }, [cnpj]);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await removerFornecedor(cnpj!);
        navigate("/fornecedores", { state: { deleted: true } });
      } catch (err) {
        setError("Erro ao excluir fornecedor");
        console.error(err);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!fornecedor) return <div>Fornecedor não encontrado</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Detalhes do Fornecedor</h2>
        <div className={styles.actions}>
          <button onClick={() => navigate(`/fornecedores/${cnpj}/editar`)}>
            Editar
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Excluir
          </button>
          <button onClick={() => navigate("/fornecedores")}>Voltar</button>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>CNPJ:</span>
          <span className={styles.detailValue}>{fornecedor.cnpj}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Nome:</span>
          <span className={styles.detailValue}>{fornecedor.nome}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Nome Fantasia:</span>
          <span className={styles.detailValue}>{fornecedor.nomeFantasia}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{fornecedor.email}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Telefone:</span>
          <span className={styles.detailValue}>{fornecedor.telefone}</span>
        </div>

        <h3 className={styles.sectionTitle}>Endereço</h3>
        {endereco && (
          <>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>CEP:</span>
              <span className={styles.detailValue}>{endereco.cep}</span>
            </div>
            {endereco.logradouro && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Logradouro:</span>
                <span className={styles.detailValue}>
                  {endereco.logradouro}
                </span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Número:</span>
              <span className={styles.detailValue}>{endereco.numero}</span>
            </div>
            {endereco.bairro && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Bairro:</span>
                <span className={styles.detailValue}>{endereco.bairro}</span>
              </div>
            )}
            {endereco.localidade && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Cidade:</span>
                <span className={styles.detailValue}>
                  {endereco.localidade}
                </span>
              </div>
            )}
            {endereco.uf && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>UF:</span>
                <span className={styles.detailValue}>{endereco.uf}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FornecedorView;
