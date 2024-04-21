import { useEffect, useState } from "react";
import { findAll } from "../services/findAll";
import { findById } from "../services/findById";
import { deleteById } from "../services/deleteById";
import { updateById } from "../services/updateById";
import { create } from "../services/create";

export function useSectionCRUD<T = any>(path: string) {
  const [listData, setListData] = useState<T[]>([]);
  const [data, setData] = useState<T>();
  const [canFetch, setCanFetch] = useState(true);

  async function handleCreate(body: object) {
    await create(undefined, path, body);
    setCanFetch(true);
    setData(undefined)
  }

  async function handleFindById(id: number) {
    const response = await findById(undefined, path, id);
    setData(response);
  }
  async function handleDeleteById(id: number) {
    await deleteById(undefined, path, id);
    setCanFetch(true);
    setData(undefined)
  }

  async function handleUpdateById(id: number, body: object) {
    await updateById(undefined, path, id, body);
    setCanFetch(true);
    setData(undefined)
  }

  useEffect(() => {
    if (!canFetch) {
      return;
    }
    async function request() {
      const response = await findAll(undefined, path);
      setListData(response);
      setCanFetch(false);
    }
    request();
  }, [canFetch]);

  return {
    listData,
    data,
    handleCreate,
    handleFindById,
    handleDeleteById,
    handleUpdateById,
  };
}
