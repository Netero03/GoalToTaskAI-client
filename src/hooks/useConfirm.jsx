import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal.jsx";

export default function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  function confirmDialog({ title, message }) {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        title,
        message,
        onConfirm: () => {
          setConfirmState((prev) => ({ ...prev, open: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((prev) => ({ ...prev, open: false }));
          resolve(false);
        },
      });
    });
  }

  const modal = (
    <ConfirmModal
      open={confirmState.open}
      title={confirmState.title}
      message={confirmState.message}
      onConfirm={confirmState.onConfirm}
      onCancel={confirmState.onCancel}
    />
  );

  return { confirmDialog, ConfirmModal: modal };
}
