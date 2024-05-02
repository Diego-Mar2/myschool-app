import { fetchData } from "./";

export interface UpdateCourseSubjects {
  course_id: number;
  subjects: {
    subject_id: number;
    semester: number;
  };
}

export async function updateCourseSubjects(
  accessToken: string,
  id: number,
  body: UpdateCourseSubjects
) {
  await fetchData(accessToken).put(`/courses/${id}/subjects`, body);
}
