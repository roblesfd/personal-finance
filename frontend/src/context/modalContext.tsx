import { createContext, Dispatch, SetStateAction } from "react";

interface ModalState {
  isOpen: boolean;
  content: object;
}

interface ModalContextType {
  modal: ModalState;
  setModal: Dispatch<SetStateAction<ModalState>>;
}

const ModalContext = createContext<ModalContextType>({
  modal: {
    isOpen: false,
    content: <></>,
  },
  setModal: () => null,
});

export default ModalContext;
