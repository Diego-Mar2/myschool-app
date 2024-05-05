import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { updateCourseSubjects } from "../services/updateCourseSubjects";

import type { PropsWithChildren } from "react";
import type { CourseSubjects as CourseSubjectsResponse } from "../services/findCourseSubjects";
import type { Course } from "../views/Courses";
import type { Subject } from "../views/Subjects";

type Data = Course & {
  additionalData?: { courseSubjects: CourseSubjectsResponse[] };
};

interface CourseFormProps {
  data?: Data;
  handleCreate: (body: Course) => Promise<void>;
  handleUpdateById: (id: number, body: Course) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

interface CourseSubjects {
  subject_id: number;
  name: string;
  semester: number;
}

export function CourseForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<CourseFormProps>) {
  const initialCourseSubjects: CourseSubjects[] =
    data?.additionalData?.courseSubjects.map(({ subject, semester }) => ({
      subject_id: subject.id,
      name: subject.name,
      semester,
    })) || [];

  const [courseSubjects, setCourseSubjects] = useState<CourseSubjects[]>(
    initialCourseSubjects,
  );

  const { session } = useAuthContext();
  const { listData } = useSectionCRUD<Subject>("/subjects");

  const { register, handleSubmit } = useForm<Course>({
    defaultValues: data,
  });

  const onSubmit = async (body: Course) => {
    setIsSubmitting(true);

    if (!data) {
      await handleCreate(body);

      handleCloseFormModal();
    } else {
      await Promise.all([
        handleUpdateById(data.id, body),
        updateCourseSubjects(session?.access_token!, data.id, {
          subjects: courseSubjects.map(({ name, ...rest }) => rest),
        }),
      ]);

      handleCloseFormModal();
      handleCloseDrawer();
    }

    setIsSubmitting(false);
  };

  const handleSemesterChange = (index: number, value: number) => {
    const updatedCourseSubjects = [...courseSubjects];
    updatedCourseSubjects[index].semester = value;
    setCourseSubjects(updatedCourseSubjects);
  };

  function handleAddSubject(event: React.ChangeEvent<HTMLSelectElement>) {
    const subjectId = Number(event.target.value);

    const subject = listData.find(({ id }) => id === subjectId);

    if (!subject) {
      return;
    }

    setCourseSubjects((prev) => [
      ...prev,
      {
        subject_id: subject.id,
        name: subject.name,
        semester: 1,
      },
    ]);
  }

  function handleRemoveSubject(subjectId: number) {
    setCourseSubjects((prev) =>
      prev.filter(({ subject_id }) => subject_id !== subjectId),
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "16px" }}
    >
      <FormControl isRequired>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} placeholder="Nome do curso" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} placeholder="Descrição do curso" />
      </FormControl>

      {data && (
        <>
          <FormControl>
            <FormLabel>Matérias</FormLabel>

            <Select
              placeholder="Selecione a matéria"
              onChange={handleAddSubject}
            >
              {listData.map(({ id, name }) => {
                if (
                  id === 3 ||
                  courseSubjects.find(({ subject_id }) => subject_id === id)
                ) {
                  return null;
                }

                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Grid gap={4}>
            {courseSubjects.map(({ subject_id, name, semester }, index) => (
              <Flex key={subject_id} align="center" justify="space-between">
                <FormLabel m={0}>{name}</FormLabel>

                <Flex align="center">
                  <FormLabel m={0} mr={2}>
                    Semestre:
                  </FormLabel>

                  <Input
                    type="number"
                    min={1}
                    max={6}
                    isRequired
                    defaultValue={semester}
                    onChange={(e) =>
                      handleSemesterChange(index, Number(e.target.value))
                    }
                  />

                  <Button
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleRemoveSubject(subject_id)}
                  >
                    Remover
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </>
      )}

      {children}
    </form>
  );
}
