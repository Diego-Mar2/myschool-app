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
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function NotificationsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<NotificationsFormProps>) {
  const { register, handleSubmit } = useForm<Notification>({
    defaultValues: data,
  });

  const onSubmit = async (body: Notification) => {
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
        <FormLabel>Título da notificação</FormLabel>
        <Input
          {...register("title")}
          maxLength={50}
          placeholder="Título da notificação"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Mensagem</FormLabel>
        <Input
          {...register("message")}
          maxLength={200}
          placeholder="Mensagem"
        />
      </FormControl>

      {children}
    </form>
  );
}
