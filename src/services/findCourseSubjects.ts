import { fetchData } from "./";

export interface CourseSubjects {
  id: number;
  semester: number;
  subject: {
    id: number;
    name: string;
  };
}

export async function findCourseSubjects(
  accessToken: string,
  id: number
): Promise<CourseSubjects[]> {
  const { data } = await fetchData(accessToken).get(`/courses/${id}/subjects`);

  return data;
}
