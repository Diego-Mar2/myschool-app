import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Subject } from "../views/Subjects";

interface SubjectFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export function SubjectForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: SubjectFormProps) {
  const { register, handleSubmit } = useForm<Subject>({
    defaultValues: data,
  });

  const onSubmit = async (body: Subject) => {
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
        <Input {...register("name")} placeholder="Nome da matéria" />
      </FormControl>

      <FormControl mt={4} mb={8}>
        <FormLabel>Descrição</FormLabel>
        <Input
          {...register("description")}
          placeholder="Descrição da matéria"
        />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Criar matéria
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
