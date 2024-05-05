import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

import { useSectionCRUD } from "../hooks/useSectionCRUD";

import type { Location } from "../views/Locations";
import type { Group } from "../views/Groups";
import type { Class } from "../views/Classes";

import type { PropsWithChildren } from "react";

interface ClassesFormProps {
  data?: Class;
  handleCreate: (body: Class) => Promise<void>;
  handleUpdateById: (id: number, body: Class) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function ClassesForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  setIsSubmitting,
  children,
}: PropsWithChildren<ClassesFormProps>) {
  const { listData: listDataLocations } =
    useSectionCRUD<Location>("/locations");
  const { listData: listDataGroups } = useSectionCRUD<Group>("/groups");
  const { register, handleSubmit } = useForm<Class>({
    defaultValues: data,
  });

  const onSubmit = async (body: Class) => {
    setIsSubmitting(true);

    const [day, month, year] = body.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    if (!data) {
      await handleCreate({
        ...body,
        date: formattedDate,
      });

      handleCloseFormModal();
    } else {
      await handleUpdateById(data.id, {
        ...body,
        date: formattedDate,
      });

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
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Local</FormLabel>
        <Select
          {...register("location_id", {
            valueAsNumber: true,
          })}
          defaultValue={data?.location_id}
          placeholder="Selecione o local da aula"
        >
          {listDataLocations.map(({ id, building, classroom, floor }) => (
            <option value={id}>
              [{building}] {floor}º Andar, sala {classroom}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Turma</FormLabel>
        <Select
          {...register("group_id", {
            valueAsNumber: true,
          })}
          placeholder="Selecione a turma"
          defaultValue={data?.group_id}
        >
          {listDataGroups.map(({ id, subject_name, name }) => {
            if (id === 3) {
              return null;
            }

            return (
              <option value={id}>
                {subject_name}, {name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Data</FormLabel>
        <Input as={InputMask} mask="99/99/9999" {...register("date")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Horário de início</FormLabel>
        <Input as={InputMask} mask="99:99" {...register("start_time")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Horário de término</FormLabel>
        <Input as={InputMask} mask="99:99" {...register("end_time")} />
      </FormControl>

      {children}
    </form>
  );
}
