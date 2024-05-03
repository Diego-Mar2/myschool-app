import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../contexts/AuthContext";
import { useSectionCRUD } from "../../hooks/useSectionCRUD";
import { updateCourseSubjects } from "../../services/updateCourseSubjects";

import type { CourseSubjects as CourseSubjectsResponse } from "../../services/findCourseSubjects";
import type { Course } from "../../views/Courses";
import type { Subject } from "../../views/Subjects";

interface CourseFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

interface CourseSubjects {
  subject_id: number;
  name: string;
  semester: number;
}

export default function CourseForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: CourseFormProps) {
  const initialCourseSubjects: CourseSubjects[] =
    (data?.additionalData as CourseSubjectsResponse[] | undefined)?.map(
      ({ subject, semester }) => ({
        subject_id: subject.id,
        name: subject.name,
        semester,
      }),
    ) || [];

  const [courseSubjects, setCourseSubjects] = useState<CourseSubjects[]>(
    initialCourseSubjects,
  );

  const { session } = useAuthContext();
  const { listData } = useSectionCRUD<Subject>("/subjects");

  const { register, handleSubmit } = useForm<Course>({
    defaultValues: data,
  });

  const onSubmit = async (body: Course) => {
    if (!data) {
      await handleCreate(body);
    } else {
      await Promise.all([
        handleUpdateById(data.id, body),
        updateCourseSubjects(session?.access_token ?? "", data.id, {
          subjects: courseSubjects.map(({ name, ...rest }) => rest),
        }),
      ]);
    }

    handleClose();
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
    <>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} placeholder="Nome do curso" />
      </FormControl>

      <FormControl mt={4} mb={8}>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} placeholder="Descrição do curso" />
      </FormControl>

      {data && (
        <>
          <FormControl mt={4}>
            <FormLabel>Matérias</FormLabel>

            <FormControl mt={4}>
              <FormLabel>Adicionar matérias</FormLabel>
              <Select
                placeholder="Selecione a matéria"
                onChange={handleAddSubject}
                mb={2}
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
          </FormControl>
        </>
      )}

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        {data ? "Editar curso" : "Criar curso"}
      </Button>

      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
