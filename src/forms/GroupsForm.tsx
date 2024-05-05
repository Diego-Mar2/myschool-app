import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useSectionCRUD } from "../hooks/useSectionCRUD";

import type { PropsWithChildren } from "react";
import type { Group } from "../views/Groups";
import type { Subject } from "../views/Subjects";
import type { Staff } from "../views/Staffs";

interface GroupsFormProps {
  data?: Group;
  handleCreate: (body: Group) => Promise<void>;
  handleUpdateById: (id: number, body: Group) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
}

export function GroupsForm({
  data,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
  children,
}: PropsWithChildren<GroupsFormProps>) {
  const { listData: listDataSubjects } = useSectionCRUD<Subject>("/subjects");
  const { listData: listDataStaff } = useSectionCRUD<Staff>("/staff");
  const { register, handleSubmit, setValue } = useForm<Group>({
    defaultValues: data,
  });

  const onSubmit = async (body: Group) => {
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
        <FormLabel>Matéria</FormLabel>
        <Select
          value={data?.subject_id}
          onChange={(e) => setValue("subject_id", Number(e.target.value))}
          placeholder="Selecione a matéria"
        >
          {listDataSubjects.map(({ id, name }) => {
            if (id === 3) {
              return null;
            }

            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Turma</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Professor</FormLabel>
        <Select
          value={data?.teacher_id ?? undefined}
          onChange={(e) => setValue("teacher_id", Number(e.target.value))}
          placeholder="Selecione o professor"
        >
          {listDataStaff.map(({ id, name, is_admin }) => {
            if (is_admin) {
              return null;
            }

            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Ano</FormLabel>
        <Input
          {...register("year", { valueAsNumber: true })}
          placeholder="Ano"
          minLength={4}
          maxLength={4}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Semestre</FormLabel>
        <Select
          {...register("semester")}
          placeholder="Semestre"
          defaultValue={data?.semester}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="1-2">1-2</option>
        </Select>
      </FormControl>

      {children}
    </form>
  );
}
