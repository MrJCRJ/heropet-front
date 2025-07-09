import { ParcelamentoControls } from "./ParcelamentoControls";
import { ParcelaPreview } from "./ParcelaPreview";
import { FormParcelamentoProps } from "../../types/pedidos";

export const FormParcelamento = ({
  quantidadeParcelas,
  setQuantidadeParcelas,
  parcelas,
  onDateChange, // Esta prop está sendo recebida
}: FormParcelamentoProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Parcelamento</h3>

      <div className="space-y-4">
        <ParcelamentoControls
          quantidadeParcelas={quantidadeParcelas}
          setQuantidadeParcelas={setQuantidadeParcelas}
        />

        {quantidadeParcelas >= 1 && (
          <ParcelaPreview
            parcelas={parcelas}
            onDateChange={onDateChange} // Corrigido: usando a prop recebida
          />
        )}
      </div>
    </div>
  );
};
