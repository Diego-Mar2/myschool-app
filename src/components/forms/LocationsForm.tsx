import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Location } from "../../views/Locations";

interface LocationsFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function LocationsForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: LocationsFormProps) {
  const { register, handleSubmit } = useForm<Location>({
    defaultValues: data,
  });

  const onSubmit = async (body: Location) => {
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
        <FormLabel>Bloco</FormLabel>
        <Input {...register("building")} placeholder="Nome do bloco" />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Andar</FormLabel>
        <Input
          {...register("floor", {
            valueAsNumber: true,
          })}
          placeholder="Número do andar"
        />
      </FormControl>

      <FormControl mt={4} mb={8}>
        <FormLabel>Sala</FormLabel>
        <Input {...register("classroom")} placeholder="Número da sala" />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Adicionar local de aula
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
