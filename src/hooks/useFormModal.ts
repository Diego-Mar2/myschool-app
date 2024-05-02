import { useState } from "react";

export function useFormModal() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  function handleOpenFormModal() {
    setIsFormModalOpen(true);
  }

  function handleCloseFormModal() {
    setIsFormModalOpen(false);
  }

  return {
    isFormModalOpen,
    handleOpenFormModal,
    handleCloseFormModal,
  };
}
