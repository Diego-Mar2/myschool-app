import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import type { PropsWithChildren } from "react";
import type { Location } from "../views/Locations";

interface LocationsFormProps {
  data?: Location;
  handleCreate: (body: Location) => Promise<void>;
  handleUpdateById: (id: number, body: Location) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function LocationsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<LocationsFormProps>) {
  const { register, handleSubmit } = useForm<Location>({
    defaultValues: data,
  });

  const onSubmit = async (body: Location) => {
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
        <FormLabel>Bloco</FormLabel>
        <Input {...register("building")} placeholder="Nome do bloco" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Andar</FormLabel>
        <Input
          {...register("floor", {
            valueAsNumber: true,
          })}
          placeholder="Número do andar"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Sala</FormLabel>
        <Input {...register("classroom")} placeholder="Número da sala" />
      </FormControl>

      {children}
    </form>
  );
}
