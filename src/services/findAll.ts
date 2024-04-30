import { fetchData } from "./";

export async function findAll(
  accessToken: string,
  path: string,
  params?: object
) {
  const { data } = await fetchData(accessToken).get(path, {
    params,
  });
  return data;
}
