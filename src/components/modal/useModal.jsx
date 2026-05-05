import { useState, useCallback } from "react";
import ModalView from "./ModalView";

export const useModal = () => {
  const [config, setConfig] = useState({ open: false, texto: "" });

  const mostrarModal = useCallback((texto) => {
    setConfig({ open: true, texto });
  }, []);

  const cerrar = () => setConfig({ open: false, texto: "" });

  const ModalComponent = config.open ? (
    <ModalView texto={config.texto} onClose={cerrar} />
  ) : null;

  return { mostrarModal, ModalComponent };
};
