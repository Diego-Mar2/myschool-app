import { useEffect, useState } from "react";
import { findAll } from "../services/findAll";
import { findById } from "../services/findById";
import { deleteById } from "../services/deleteById";

export function useSectionCRUD(path: string) {
  const [listData, setListData] = useState([]);
  const [data, setData] = useState();


  async function handleFindById(id: number) {
    const response = await findById(undefined, path, id);
    setData(response);
  }
  async function handleDeleteById(id: number) {
    await deleteById(undefined, path, id);
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
    handleDeleteById
  }
}
