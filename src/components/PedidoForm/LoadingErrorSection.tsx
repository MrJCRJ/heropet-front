interface LoadingErrorSectionProps {
  loading: boolean;
  error: string | null;
}

export const LoadingErrorSection = ({
  loading,
  error,
}: LoadingErrorSectionProps) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  return null;
};
