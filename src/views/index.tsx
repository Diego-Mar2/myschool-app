import ClassesForm from "../components/forms/ClassesForm";
import CourseForm from "../components/forms/CoursesForm";
import LocationsForm from "../components/forms/LocationsForm";
import StaffsForm from "../components/forms/StaffsForm";
import StudentsForm from "../components/forms/StudentsForm";
import SubjectForm from "../components/forms/SubjectsForm";
import Classes from "./Classes";
import Courses from "./Courses";
import Groups from "./Groups";
import Locations from "./Locations";
import Notifications from "./Notifications";
import Staffs from "./Staffs";
import Students from "./Students";
import Subjects from "./Subjects";

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
