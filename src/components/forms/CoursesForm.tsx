import { useForm } from "react-hook-form"
import { create } from "../../services/create";

export default function CourseForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (body: any) => await create(undefined, '/courses', body);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nome do Curso</label>
      <input {...register("name")} />
      <label>Descrição do Curso</label>
      <input {...register("description")} />
      <input type="submit" />
    </form>
  )
}
