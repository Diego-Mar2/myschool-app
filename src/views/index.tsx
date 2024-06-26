import { Courses } from "./Courses";
import { CourseForm } from "../forms/CoursesForm";

import { Subjects } from "./Subjects";
import { SubjectForm } from "../forms/SubjectsForm";

import { Classes } from "./Classes";
import { ClassesForm } from "../forms/ClassesForm";

import { Groups } from "./Groups";
import { GroupsForm } from "../forms/GroupsForm";

import { Students } from "./Students";
import { StudentsForm } from "../forms/StudentsForm";

import { Staffs } from "./Staffs";
import { StaffsForm } from "../forms/StaffsForm";

import { Locations } from "./Locations";
import { LocationsForm } from "../forms/LocationsForm";

import { Notifications } from "./Notifications";
import { NotificationsForm } from "../forms/NotificationsForm";

export type SectionName = keyof typeof Sections;

export const Sections = {
  Funcionários: {
    component: Staffs,
    form: StaffsForm,
  },
  Alunos: {
    component: Students,
    form: StudentsForm,
  },
  Cursos: {
    component: Courses,
    form: CourseForm,
  },
  Matérias: {
    component: Subjects,
    form: SubjectForm,
  },
  Turmas: {
    component: Groups,
    form: GroupsForm,
  },
  Aulas: {
    component: Classes,
    form: ClassesForm,
  },
  "Salas de aula": {
    component: Locations,
    form: LocationsForm,
  },
  Notificações: {
    component: Notifications,
    form: NotificationsForm,
  },
};

export const SectionsNames = Object.keys(Sections) as SectionName[];
