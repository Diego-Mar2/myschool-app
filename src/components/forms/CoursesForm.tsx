import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Course } from "../../views/Courses";

interface CourseFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function CourseForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: CourseFormProps) {
  const { register, handleSubmit } = useForm<Course>({
    defaultValues: data,
  });

  const onSubmit = async (body: Course) => {
    if (!data) {
      await handleCreate(body);
    } else {
      await handleUpdateById(data.id, body);
    }
    handleClose();
  };

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

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Criar curso
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
