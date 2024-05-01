import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import type { Staff } from "../../views/Staffs";

interface StaffsFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function StaffsForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: StaffsFormProps) {
  const { register, handleSubmit } = useForm<Staff>({
    defaultValues: data,
  });

  const onSubmit = async (body: Staff) => {
    if (!data) {
      await handleCreate({ ...body, course_id: Number(body.id) });
    } else {
      await handleUpdateById(data.id, { ...body, course_id: Number(body.id) });
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

      <FormControl mt={4} mb={8}>
        <FormLabel>Permissão pra administração?</FormLabel>
        <Switch id="isAdmin" {...register("is_admin")} />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Adicionar colaborador
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
