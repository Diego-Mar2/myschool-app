import { useState } from "react";

export function useDrawer<T extends { id: number }>(
  data: T | undefined,
  setData: (data: T | undefined) => void,
  handleFindById: (id: number) => Promise<void>,
  handleDeleteById: (id: number) => Promise<void>
) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleOpen(id: number) {
    setIsOpen(true);
    await handleFindById(id);
  }

  function handleClose() {
    setIsOpen(false);
    setData(undefined);
  }

  async function handleDelete() {
    if (data?.id) {
      await handleDeleteById(data.id);
      handleClose();
    }
  }

  return { isOpen, handleOpen, handleClose, handleDelete };
}
