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

interface ClassesFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function ClassesForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: ClassesFormProps) {
  const { listData } = useSectionCRUD<Location>("/locations");
  const { register, handleSubmit } = useForm<Class>({
    defaultValues: data,
  });

  const onSubmit = async (body: Class) => {
    if (!data) {
      await handleCreate({...body, course_id: Number(body.id)});
    } else {
      await handleUpdateById(data.id, {...body, course_id: Number(body.id)});
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
          {listData.map(({ id, building, classroom, floor }) => (
            <option value={id}>[{building}] {floor}º Andar, sala {classroom},</option>
          ))}
        </Select>
        <FormLabel>Turma</FormLabel>
        <Select
          {...register("group_id", {
            valueAsNumber: true,
          })}
          placeholder="Selecione a turma"
        >
          {listData.map(({ id, building, classroom, floor }) => (
            <option value={id}>[{building}] {floor}º Andar, sala {classroom},</option>
          ))}
        </Select>
        <FormLabel>Data</FormLabel>
        {/* <Input {...register("")} /> */}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>RA</FormLabel>
        {/* <Input {...register("")} /> */}
      </FormControl>
      <FormControl mt={4}>
      </FormControl>
      <FormControl mt={4} mb={8}>
        <FormLabel>Semestre</FormLabel>
        {/* <Input {...register("", {
          valueAsNumber: true,
        })} /> */}
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Adicionar aluno
      </Button>
      <Button onClick={handleClose}>Cancelar</Button>
    </>
  );
}
