import { ParcelaPreviewProps } from "../../types/pedidos";

export const ParcelaPreview = ({ parcelas }: ParcelaPreviewProps) => (
  <div className="space-y-2">
    <h4 className="text-sm font-medium text-gray-700">Pré-visualização:</h4>
    <ul className="space-y-2">
      {parcelas.map((parcela) => (
        <li key={parcela.numero} className="flex justify-between text-sm">
          <span>Parcela {parcela.numero}:</span>
          <span>
            {parcela.dataVencimento} -{" "}
            {parcela.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
