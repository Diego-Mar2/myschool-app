import { fetchData } from "./";

export async function updateById(
  accessToken: string,
  path: string,
  id: number,
  body: object
) {
  await fetchData(accessToken).put(`${path}/${id}`, body);
}
