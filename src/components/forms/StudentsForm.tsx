import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useSectionCRUD } from "../../hooks/useSectionCRUD";

import type { Student } from "../../views/Students";
import type { Course } from "../../views/Courses";

interface StudentsFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function StudentsForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: StudentsFormProps) {
  const { listData } = useSectionCRUD<Course>("/courses");
  const { register, handleSubmit } = useForm<Student>({
    defaultValues: data,
  });

  const onSubmit = async (body: Student) => {
    if (!data) {
      await handleCreate({ ...body, course_id: Number(body.course_id) });
    } else {
      await handleUpdateById(data.id, {
        ...body,
        course_id: Number(body.course_id),
      });
    }
    handleClose();
  };

  return (
    <>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} />
      </FormControl>

      {data?.id && (
        <FormControl mt={4}>
          <FormLabel>Matrícula</FormLabel>
          <Input {...register("registration")} minLength={13} maxLength={13} />
        </FormControl>
      )}

      <FormControl mt={4}>
        <FormLabel>CPF</FormLabel>
        <Input {...register("document")} />
      </FormControl>

      <FormControl mt={4}>
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

      <FormControl mt={4} mb={8}>
        <FormLabel>Semestre</FormLabel>
        <Input
          {...register("semester", {
            valueAsNumber: true,
          })}
        />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Adicionar aluno
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
