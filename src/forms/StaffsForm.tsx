import { FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import type { PropsWithChildren } from "react";
import type { Staff } from "../views/Staffs";

interface StaffsFormProps {
  data?: Staff;
  handleCreate: (body: Staff) => Promise<void>;
  handleUpdateById: (id: number, body: Staff) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  handleSubmitForm: () => void;
}

export function StaffsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  handleSubmitForm,
  children,
}: PropsWithChildren<StaffsFormProps>) {
  const { register, handleSubmit } = useForm<Staff>({
    defaultValues: data,
  });

  const onSubmit = async (body: Staff) => {
    handleSubmitForm();

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
        <FormLabel>Permissão pra administração?</FormLabel>
        <Switch id="isAdmin" {...register("is_admin")} />
      </FormControl>

      {children}
    </form>
  );
}
