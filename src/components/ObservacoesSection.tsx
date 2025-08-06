// src/components/ObservacoesSection.tsx
interface ObservacoesSectionProps {
  observacoes: string;
}

export const ObservacoesSection = ({
  observacoes,
}: ObservacoesSectionProps) => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Observações</h2>
    <p className="text-sm text-gray-700 whitespace-pre-line">{observacoes}</p>
  </div>
);
