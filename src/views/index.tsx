import { Courses } from "./Courses";
import { CourseForm } from "../components/forms/CoursesForm";

import { Subjects } from "./Subjects";
import { SubjectForm } from "../components/forms/SubjectsForm";

import { Classes } from "./Classes";
import { ClassesForm } from "../components/forms/ClassesForm";

import { Groups } from "./Groups";

import { Students } from "./Students";
import { StudentsForm } from "../components/forms/StudentsForm";

import { Staffs } from "./Staffs";
import { StaffsForm } from "../components/forms/StaffsForm";

import { Locations } from "./Locations";
import { LocationsForm } from "../components/forms/LocationsForm";

import { Notifications } from "./Notifications";

export type SectionName = keyof typeof Sections;

export const Sections = {
  Cursos: {
    component: Courses,
    form: CourseForm,
  },
  Matérias: {
    component: Subjects,
    form: SubjectForm,
  },
  Aulas: {
    component: Classes,
    form: ClassesForm,
  },
  Turmas: {
    component: Groups,
    form: CourseForm,
  },
  Alunos: {
    component: Students,
    form: StudentsForm,
  },
  Professores: {
    component: Staffs,
    form: StaffsForm,
  },
  "Salas de aula": {
    component: Locations,
    form: LocationsForm,
  },
  Notificações: {
    component: Notifications,
    form: CourseForm,
  },
};

export const SectionsNames = Object.keys(Sections) as SectionName[];
