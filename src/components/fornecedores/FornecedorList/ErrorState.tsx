interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="p-4 my-4 text-red-600 bg-red-50 rounded-md border border-red-100">
    <p className="font-medium">Erro ao carregar fornecedores</p>
    <p className="text-sm mt-1">{error}</p>
  </div>
);

export default ErrorState;
