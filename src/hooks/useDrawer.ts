import { useState } from "react";

export function useDrawer<T extends { id: number }>(
  data: T | undefined,
  setData: (data: T | undefined) => void,
  handleFindById: (id: number) => Promise<void>,
  handleDeleteById: (id: number) => Promise<void>,
) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function handleOpenDrawer(id: number) {
    setIsDrawerOpen(true);
    await handleFindById(id);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setData(undefined);
  }

  async function handleDeleteRegister() {
    if (data?.id) {
      await handleDeleteById(data.id);
      handleCloseDrawer();
    }
  }

  return {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  };
}
