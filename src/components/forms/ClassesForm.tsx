import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Class } from "../../views/Classes";
import { useSectionCRUD } from "../../hooks/useSectionCRUD";
import { Location } from "../../views/Locations";
import { Group } from "../../views/Groups";
import InputMask from "react-input-mask";

interface ClassesFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export function ClassesForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: ClassesFormProps) {
  const { listData: listDataLocations } =
    useSectionCRUD<Location>("/locations");
  const { listData: listDataGroups } = useSectionCRUD<Group>("/groups");
  const { register, handleSubmit } = useForm<Class>({
    defaultValues: data,
  });

  const onSubmit = async (body: Class) => {
    const [day, month, year] = body.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    if (!data) {
      await handleCreate({
        ...body,
        course_id: Number(body.id),
        date: formattedDate,
      });
    } else {
      await handleUpdateById(data.id, {
        ...body,
        course_id: Number(body.id),
        date: formattedDate,
      });
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
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Local</FormLabel>
        <Select
          {...register("location_id", {
            valueAsNumber: true,
          })}
          placeholder="Selecione o local da aula"
        >
          {listDataLocations.map(({ id, building, classroom, floor }) => (
            <option value={id}>
              [{building}] {floor}º Andar, sala {classroom}
            </option>
          ))}
        </Select>
        <FormLabel>Turma</FormLabel>
        <Select
          {...register("group_id", {
            valueAsNumber: true,
          })}
          placeholder="Selecione a turma"
        >
          {listDataGroups.map(({ id, subject_name, name }) =>
            id !== 3 ? (
              <option value={id}>
                {subject_name}, {name}
              </option>
            ) : null,
          )}
        </Select>
        <FormLabel>Data</FormLabel>
        <Input
          as={InputMask}
          mask="99/99/9999" //verificar ainda esse detalhe de data
          {...register("date")}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Horário de início</FormLabel>
        <Input as={InputMask} mask="99:99" {...register("start_time")} />
      </FormControl>
      <FormControl mt={4}></FormControl>
      <FormControl mt={4} mb={8}>
        <FormLabel>Horário de término</FormLabel>
        <Input as={InputMask} mask="99:99" {...register("end_time")} />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Adicionar aluno
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
