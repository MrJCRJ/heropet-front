import { AddressFieldsProps } from "../../types/cliente";

export const AddressFields = ({
  address,
  onComplementoChange,
  onNumeroChange,
  disabled,
}: AddressFieldsProps) => {
  return (
    <>
      {address.logradouro && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Logradouro:
          </label>
          <input
            type="text"
            value={address.logradouro}
            readOnly
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed"
          />
        </div>
      )}

      {address.bairro && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bairro:
          </label>
          <input
            type="text"
            value={address.bairro}
            readOnly
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cidade:
          </label>
          <input
            type="text"
            value={address.localidade || ""}
            readOnly
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">UF:</label>
          <input
            type="text"
            value={address.uf || ""}
            readOnly
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="endereco.numero"
            className="block text-sm font-medium text-gray-700"
          >
            Número:
          </label>
          <input
            type="text"
            id="endereco.numero"
            name="endereco.numero"
            value={address.numero || ""}
            onChange={onNumeroChange}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endereco.complemento"
            className="block text-sm font-medium text-gray-700"
          >
            Complemento:
          </label>
          <input
            type="text"
            id="endereco.complemento"
            name="endereco.complemento"
            value={address.complemento || ""}
            onChange={onComplementoChange}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </>
  );
};
