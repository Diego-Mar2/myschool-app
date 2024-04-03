import { useEffect, useState } from "react";
import { findAll } from "../services/findAll";
import { findById } from "../services/findById";
import { deleteById } from "../services/deleteById";
import { updateById } from "../services/updateById";

export function useSectionCRUD(path: string) {
  const [listData, setListData] = useState([]);
  const [data, setData] = useState<any>();

  async function handleFindById(id: number) {
    const response = await findById(undefined, path, id);
    setData(response);
  }
  async function handleDeleteById(id: number) {
    await deleteById(undefined, path, id);
  }

  async function handleUpdateById(id: number, body: object) {
    await updateById(undefined, path, id, body);
  }

  useEffect(() => {
    async function request() {
      const response = await findAll(undefined, path);
      setListData(response);
    }
    request();
  }, []);

  return {
    listData,
    data,
    handleFindById,
    handleDeleteById,
    handleUpdateById,
  };
}
