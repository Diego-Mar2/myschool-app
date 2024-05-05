import { fetchData } from "./";

export interface UpdateGroupStudents {
  students: number[];
}

export async function updateGroupStudents(
  accessToken: string,
  id: number,
  body: UpdateGroupStudents,
) {
  await fetchData(accessToken).put(`/groups/${id}/students`, body);
}
