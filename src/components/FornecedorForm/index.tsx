import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { Endereco } from "../../api/fornecedores";

export interface FornecedorFormProps {
  initialData?: {
    cnpj: string;
    nome?: string;
    nomeFantasia?: string;
    email?: string;
    telefone?: string;
    endereco?: Endereco;
  };
  onSubmit: (data: {
    cnpj: string;
    nome?: string;
    nomeFantasia?: string;
    email?: string;
    telefone?: string;
    endereco?: Endereco;
  }) => void;
  isEditing?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const FornecedorForm = ({
  initialData = {
    cnpj: "",
    nome: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    endereco: {
      cep: "",
      numero: "",
    },
  },
  onSubmit,
  isEditing = false,
  isLoading = false,
  error = null,
}: FornecedorFormProps) => {
  const [formData, setFormData] = useState({
    cnpj: initialData.cnpj || "",
    nome: initialData.nome || "",
    nomeFantasia: initialData.nomeFantasia || "",
    email: initialData.email || "",
    telefone: initialData.telefone || "",
    endereco: {
      cep: initialData.endereco?.cep || "",
      numero: initialData.endereco?.numero || "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Prepara os dados para envio, convertendo strings vazias para undefined
    const dadosParaEnviar = {
      cnpj: formData.cnpj,
      nome: formData.nome || undefined,
      nomeFantasia: formData.nomeFantasia || undefined,
      email: formData.email || undefined,
      telefone: formData.telefone || undefined,
      endereco: {
        cep: formData.endereco.cep || undefined,
        numero: formData.endereco.numero || undefined,
      },
    };

    onSubmit(dadosParaEnviar);
  };

  return (
    <div className={styles.container}>
      <h2>{isEditing ? "Editar Fornecedor" : "Novo Fornecedor"}</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {!isEditing && (
          <div className={styles.formGroup}>
            <label htmlFor="cnpj">CNPJ:</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nomeFantasia">Nome Fantasia:</label>
          <input
            type="text"
            id="nomeFantasia"
            name="nomeFantasia"
            value={formData.nomeFantasia}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Endereço</legend>

          <div className={styles.formGroup}>
            <label htmlFor="endereco.cep">CEP:</label>
            <input
              type="text"
              id="endereco.cep"
              name="endereco.cep"
              value={formData.endereco.cep}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endereco.numero">Número:</label>
            <input
              type="text"
              id="endereco.numero"
              name="endereco.numero"
              value={formData.endereco.numero}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </fieldset>

        <div className={styles.buttons}>
          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? styles.loading : ""}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FornecedorForm;
