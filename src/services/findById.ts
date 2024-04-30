import { fetchData } from "./";

export async function findById(
  accessToken: string,
  path: string,
  id: number,
) {
  const { data } = await fetchData(accessToken).get(`${path}/${id}`);
  return data;
}
