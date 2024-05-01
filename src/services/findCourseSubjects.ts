import { fetchData } from "./";

export async function findCourseSubjects(accessToken: string, id: number) {
  const { data } = await fetchData(accessToken).get(`/courses/${id}/subjects`);

  return data;
}
