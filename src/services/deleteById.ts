import { fetchData } from "./";

export async function deleteById(
  accessToken: string,
  path: string,
  id: number,
) {
  await fetchData(accessToken).delete(`${path}/${id}`);
}
