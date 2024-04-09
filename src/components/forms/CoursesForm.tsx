import { useForm } from "react-hook-form";

interface CourseFormProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  data: any;
}

export default function CourseForm({
  handleCreate,
  handleUpdateById,
  setIsCreateOpen,
  data,
}: CourseFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (body: any) => {
    if (!data) {
      await handleCreate(body);
    } else {
      await handleUpdateById(data.id, body);
    }
    setIsCreateOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nome do Curso</label>
      <input {...register("name")} />
      <label>Descrição do Curso</label>
      <input {...register("description")} />
      <input type="submit" />
    </form>
  );
}
