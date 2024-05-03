import { useState } from "react";

export function useFormModal(handleCloseDrawer: () => void) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  function handleOpenFormModal() {
    setIsFormModalOpen(true);
  }

  function handleCloseFormModal() {
    handleCloseDrawer();
    setIsFormModalOpen(false);
  }

  return {
    isFormModalOpen,
    handleOpenFormModal,
    handleCloseFormModal,
  };
}
