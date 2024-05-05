import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  List,
  ListItem,
  Select,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { updateGroupStudents } from "../services/updateGroupStudents";

import type { PropsWithChildren } from "react";
import type { Group, AdditionalData } from "../views/Groups";
import type { Subject } from "../views/Subjects";
import type { Staff } from "../views/Staffs";
import type { Student } from "../views/Students";
import type { GroupStudent } from "../services/findGroupStudents";

type Data = Group & {
  additionalData?: AdditionalData;
};

interface GroupsFormProps {
  data?: Data;
  handleCreate: (body: Group) => Promise<void>;
  handleUpdateById: (id: number, body: Group) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function GroupsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<GroupsFormProps>) {
  const initialGroupStudents =
    data?.additionalData?.groupStudents.map(({ student }) => student) || [];

  const [groupStudents, setGroupStudents] =
    useState<GroupStudent[]>(initialGroupStudents);

  const { session } = useAuthContext();
  const { listData: listDataSubjects } = useSectionCRUD<Subject>("/subjects");
  const { listData: listDataStaff } = useSectionCRUD<Staff>("/staff");
  const { listData: listDataStudents } = useSectionCRUD<Student>("/students");

  const { register, handleSubmit, setValue } = useForm<Group>({
    defaultValues: data,
  });

  const onSubmit = async (body: Group) => {
    setIsSubmitting(true);

    if (!data) {
      await handleCreate(body);

      handleCloseFormModal();
    } else {
      await Promise.all([
        handleUpdateById(data.id, body),
        updateGroupStudents(session?.access_token!, data.id, {
          students: groupStudents.map(({ id }) => id),
        }),
      ]);

      handleCloseFormModal();
      handleCloseDrawer();
    }

    setIsSubmitting(false);
  };

  function handleAddStudent(event: React.ChangeEvent<HTMLSelectElement>) {
    const studentId = Number(event.target.value);

    const student = listDataStudents.find(({ id }) => id === studentId);

    if (!student) {
      return;
    }

    setGroupStudents((prev) => [
      ...prev,
      {
        id: student.id,
        name: student.name,
        email: student.email,
        semester: student.semester,
        course: student.course_name,
      },
    ]);
  }

  function handleRemoveStudent(studentId: number) {
    setGroupStudents((prev) => prev.filter(({ id }) => id !== studentId));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "16px" }}
    >
      <FormControl isRequired>
        <FormLabel>Matéria</FormLabel>
        <Select
          value={data?.subject_id}
          onChange={(e) => setValue("subject_id", Number(e.target.value))}
          placeholder="Selecione a matéria"
        >
          {listDataSubjects.map(({ id, name }) => {
            if (id === 3) {
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

      <FormControl isRequired>
        <FormLabel>Turma</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Professor</FormLabel>
        <Select
          value={data?.teacher_id ?? undefined}
          onChange={(e) => setValue("teacher_id", Number(e.target.value))}
          placeholder="Selecione o professor"
        >
          {listDataStaff.map(({ id, name, is_admin }) => {
            if (is_admin) {
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

      <FormControl isRequired>
        <FormLabel>Ano</FormLabel>
        <Input
          {...register("year", { valueAsNumber: true })}
          placeholder="Ano"
          minLength={4}
          maxLength={4}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Semestre</FormLabel>
        <Select
          {...register("semester")}
          placeholder="Semestre"
          defaultValue={data?.semester}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="1-2">1-2</option>
        </Select>
      </FormControl>

      {data && (
        <>
          <FormControl>
            <FormLabel>Estudantes</FormLabel>

            <Select
              placeholder="Selecione o estudante"
              onChange={handleAddStudent}
            >
              {listDataStudents.map(({ id, name, course_name, semester }) => {
                if (
                  groupStudents.find(({ id: studentId }) => studentId === id)
                ) {
                  return null;
                }

                return (
                  <option key={id} value={id}>
                    [{id}] - {name} - {course_name} - {semester}º semestre
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Grid gap={4}>
            {groupStudents.map(({ id, name, course, semester }) => (
              <List key={id} flex={1} mb={5}>
                <ListItem>
                  &bull; ID:{" "}
                  <Text display="inline" fontWeight={700}>
                    {id}
                  </Text>
                </ListItem>
                <ListItem>
                  &bull; Nome:{" "}
                  <Text display="inline" fontWeight={700}>
                    {name}
                  </Text>
                </ListItem>
                <ListItem>
                  &bull; Curso:{" "}
                  <Text display="inline" fontWeight={700}>
                    {course}
                  </Text>
                </ListItem>
                <ListItem>
                  &bull; Semestre:{" "}
                  <Text display="inline" fontWeight={700}>
                    {semester}
                  </Text>
                </ListItem>
                <ListItem>
                  <Button
                    width="100%"
                    colorScheme="red"
                    onClick={() => handleRemoveStudent(id)}
                  >
                    Remover estudante
                  </Button>
                </ListItem>
              </List>
            ))}
          </Grid>
        </>
      )}

      {children}
    </form>
  );
}
