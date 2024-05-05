import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import type { PropsWithChildren } from "react";
import type { Subject } from "../views/Subjects";

interface SubjectFormProps {
  data?: Subject;
  handleCreate: (body: Subject) => Promise<void>;
  handleUpdateById: (id: number, body: Subject) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
}

export function SubjectForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  children,
}: PropsWithChildren<SubjectFormProps>) {
  const { register, handleSubmit } = useForm<Subject>({
    defaultValues: data,
  });

  const onSubmit = async (body: Subject) => {
    if (!data) {
      await handleCreate(body);
    } else {
      await handleUpdateById(data.id, body);

      handleCloseDrawer();
    }

    handleCloseFormModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "16px" }}
    >
      <FormControl isRequired>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} placeholder="Nome da matéria" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Descrição</FormLabel>
        <Input
          {...register("description")}
          placeholder="Descrição da matéria"
        />
      </FormControl>

      {children}
    </form>
  );
}
