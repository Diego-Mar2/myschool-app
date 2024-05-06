import { useEffect } from "react";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { dateMask } from "../utils/dateMask";
import { timeMask } from "../utils/timeMask";

import type { PropsWithChildren } from "react";
import type { Group } from "../views/Groups";
import type { Location } from "../views/Locations";
import type { Class } from "../views/Classes";

interface ClassesFormProps {
  data?: Class;
  handleCreate: (body: Class) => Promise<void>;
  handleUpdateById: (id: number, body: Class) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

function formatDate(date: string, fromDB: boolean) {
  if (fromDB) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  } else {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
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
  const { listData: listDataGroups } = useSectionCRUD<Group>("/groups");
  const { listData: listDataLocations } =
    useSectionCRUD<Location>("/locations");
  const { register, setValue, handleSubmit } = useForm<Class>({
    defaultValues: data
      ? {
          ...data,
          date: formatDate(data.date, true),
          start_time: timeMask(data.start_time),
          end_time: timeMask(data.end_time),
        }
      : undefined,
  });

  const onSubmit = async (body: Class) => {
    setIsSubmitting(true);

    const formattedDate = formatDate(body.date, false);

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

  useEffect(() => {
    if (data) {
      setValue("group_id", data.group_id);
    }
  }, [listDataGroups]);

  useEffect(() => {
    if (data) {
      setValue("location_id", data.location_id);
    }
  }, [listDataLocations]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "16px" }}
    >
      <FormControl isRequired>
        <FormLabel>Turma</FormLabel>
        <Select
          {...register("group_id", { valueAsNumber: true })}
          placeholder="Selecione a turma"
        >
          {listDataGroups.map(({ id, subject_name, name }) => {
            if (id === 3) {
              return null;
            }

            return (
              <option key={id} value={id}>
                {subject_name}, {name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Data</FormLabel>
        <Input
          {...register("date", {
            onChange: (e) => setValue("date", dateMask(e.target.value)),
          })}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Horário de início</FormLabel>
        <Input
          {...register("start_time", {
            onChange: (e) => setValue("start_time", timeMask(e.target.value)),
          })}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Horário de término</FormLabel>
        <Input
          {...register("end_time", {
            onChange: (e) => setValue("end_time", timeMask(e.target.value)),
          })}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Local</FormLabel>
        <Select
          {...register("location_id", { valueAsNumber: true })}
          placeholder="Selecione o local da aula"
        >
          {listDataLocations.map(({ id, building, classroom, floor }) => (
            <option key={id} value={id}>
              [{building}] {floor}º Andar, sala {classroom}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} />
      </FormControl>

      {children}
    </form>
  );
}
