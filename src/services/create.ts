import { fetchData } from "./";

export async function create(
  accessToken: string,
  path: string,
  body: object
) {
  await fetchData(accessToken).post(path, body);
}
