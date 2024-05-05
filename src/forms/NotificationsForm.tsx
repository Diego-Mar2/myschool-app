import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import type { PropsWithChildren } from "react";
import type { Notification } from "../views/Notifications";

interface NotificationsFormProps {
  data?: Notification;
  handleCreate: (body: Notification) => Promise<void>;
  handleUpdateById: (id: number, body: Notification) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  handleSubmitForm: () => void;
}

export function NotificationsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  handleSubmitForm,
  children,
}: PropsWithChildren<NotificationsFormProps>) {
  const { register, handleSubmit } = useForm<Notification>({
    defaultValues: data,
  });

  const onSubmit = async (body: Notification) => {
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
        <FormLabel>Título da notificação</FormLabel>
        <Input {...register("title")} placeholder="Título da notificação" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Mensagem</FormLabel>
        <Input {...register("message")} placeholder="Mensagem" />
      </FormControl>

      {children}
    </form>
  );
}
