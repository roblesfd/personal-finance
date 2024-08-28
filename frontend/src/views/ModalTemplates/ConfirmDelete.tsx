import { useContext } from "react";
import ModalContext from "../../context/modalContext";

const ConfirmDelete = () => {
  const { modal, setModal } = useContext(ModalContext);

  const onSaveUserClicked = () => {};

  const handleModalClose = () => {
    setModal({
      isOpen: false,
      content: null,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full rounded px-8 pt-4 pb-8 text-primary-950">
        <h2 className="text-xl font-bold text-center mb-8">
          ¿Estas seguro de realizar esta acción?
        </h2>
        <div className="flex justify-center gap-6">
          <button className="w-28 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Si
          </button>
          <button
            className="w-28 bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleModalClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
