import CourseForm from "../components/forms/CoursesForm";
import Classes from "./Classes";
import Courses from "./Courses";
import Groups from "./Groups";
import Locations from "./Locations";
import Notifications from "./Notifications";
import Staffs from "./Staffs";
import Students from "./Students";
import Subjects from "./Subjects";

export type SectionName = keyof typeof Sections

export const Sections = {
  Cursos: {
    component: Courses,
    form: CourseForm
  },
  Matérias: {
    component: Subjects,
    form: CourseForm
  },
  Classes: {
    component: Classes,
    form: CourseForm
  },
  Grupos: {
    component: Groups,
    form: CourseForm
  },
  Alunos: {
    component: Students,
    form: CourseForm
  },
  Professores: {
    component: Staffs,
    form: CourseForm
  },
  'Salas de aula': {
    component: Locations,
    form: CourseForm
  },
  Notificações: {
    component: Notifications,
    form: CourseForm
  },
}

export const SectionsNames = Object.keys(Sections) as SectionName[]
