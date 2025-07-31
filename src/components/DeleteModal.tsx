import Modal from "./ui/Modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Exclusão">
    <div className="space-y-4">
      <p className="text-gray-700">
        Tem certeza que deseja excluir este pedido?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors"
        >
          Confirmar Exclusão
        </button>
      </div>
    </div>
  </Modal>
);
