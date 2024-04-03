import Courses from "./Courses";
import Subjects from "./Subjects";

export type SectionName = keyof typeof Sections

export const Sections = {
  Cursos: Courses,
  Matérias: Subjects
}

export const SectionsNames = Object.keys(Sections) as SectionName[]
