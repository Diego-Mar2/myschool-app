import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nome do Curso</label>
        <input {...register("name")} />
        <label>Descrição do Curso</label>
        <input {...register("description")} />
        <input type="submit" />
      </form>

      <Button onClick={onOpen}>Open Modal</Button>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar um novo curso</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl onSubmit={handleSubmit(onSubmit)}>
              <FormLabel>Nome do curso</FormLabel>
              <Input {...register("name")} placeholder="Nome do curso" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input {...register("description")} placeholder="Descrição do curso" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
              Criar curso
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
