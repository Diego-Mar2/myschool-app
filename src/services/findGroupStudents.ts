import { fetchData } from "./";

export interface GroupStudents {
  id: number;
  student: Student;
}

interface Student {
  course: string;
  id: number;
  name: string;
  email: string;
  semester: number;
}

export async function findGroupStudents(
  accessToken: string,
  id: number,
): Promise<GroupStudents[]> {
  const { data } = await fetchData(accessToken).get(`/groups/${id}/students`);

  return data;
}
