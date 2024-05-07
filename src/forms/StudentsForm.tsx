import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useSectionCRUD } from "../hooks/useSectionCRUD";

import type { PropsWithChildren } from "react";
import type { Student } from "../views/Students";
import type { Course } from "../views/Courses";

interface StudentsFormProps {
  data?: Student;
  handleCreate: (body: Student) => Promise<void>;
  handleUpdateById: (id: number, body: Student) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function StudentsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<StudentsFormProps>) {
  const { listData } = useSectionCRUD<Course>("/courses");
  const { register, handleSubmit } = useForm<Student>({
    defaultValues: data,
  });

  const onSubmit = async (body: Student) => {
    setIsSubmitting(true);

    if (!data) {
      await handleCreate(body);

      handleCloseFormModal();
    } else {
      await handleUpdateById(data.id, body);

      handleCloseFormModal();
      handleCloseDrawer();
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "16px" }}
    >
      <FormControl isRequired>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input {...register("email")} />
      </FormControl>

      {data?.id && (
        <FormControl isRequired isDisabled>
          <FormLabel>Matrícula</FormLabel>
          <Input {...register("registration")} />
        </FormControl>
      )}

      <FormControl isRequired>
        <FormLabel>CPF</FormLabel>
        <Input {...register("document")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Curso</FormLabel>
        <Select
          {...register("course_id", {
            valueAsNumber: true,
          })}
          placeholder="Selecione o curso"
        >
          {listData.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Semestre</FormLabel>
        <Input
          {...register("semester", {
            valueAsNumber: true,
          })}
        />
      </FormControl>

      {children}
    </form>
  );
}
