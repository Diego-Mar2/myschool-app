import { fetchData } from "./";

export interface UpdateCourseSubjects {
  subjects: Subject[];
}

interface Subject {
  subject_id: number;
  semester: number;
}

export async function updateCourseSubjects(
  accessToken: string,
  id: number,
  body: UpdateCourseSubjects,
) {
  await fetchData(accessToken).put(`/courses/${id}/subjects`, body);
}
