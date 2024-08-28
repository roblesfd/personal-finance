import { useEffect, useState } from "react";
import ModalContext from "./modalContext";
import Modal from "@/components/Modal";

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    content: "",
  });
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  });

  if (!renderComponent) return <></>;

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
