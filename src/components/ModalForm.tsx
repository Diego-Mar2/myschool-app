import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

interface ModalProps<T, A> {
  isOpen: boolean;
  data?: Data<T, A>;
  Form: (props: FormProps<T, A>) => React.ReactNode;
  handleCreate: (body: T) => Promise<void>;
  handleUpdateById: (id: number, body: T) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
}

type Data<T, A> = T & { additionalData?: A };

type FormProps<T, A> = PropsWithChildren<{
  data?: Data<T, A>;
  handleCreate: (body: T) => Promise<void>;
  handleUpdateById: (id: number, body: T) => Promise<void>;
  handleCloseFormModal: () => void;
  handleCloseDrawer: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}>;

export function ModalForm<T, A = any>({
  isOpen,
  data,
  Form,
  handleCreate,
  handleUpdateById,
  handleCloseFormModal,
  handleCloseDrawer,
}: ModalProps<T, A>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseFormModal}
      blockScrollOnMount
      scrollBehavior="inside"
      closeOnEsc
    >
      <ModalOverlay />

      <ModalContent p={4} maxW={1200}>
        <ModalHeader>{data ? "Editar" : "Adicionar"} </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Form
            data={data}
            handleCreate={handleCreate}
            handleUpdateById={handleUpdateById}
            handleCloseFormModal={handleCloseFormModal}
            handleCloseDrawer={handleCloseDrawer}
            setIsSubmitting={setIsSubmitting}
          >
            <Flex maxW={360} mt={10}>
              <Button onClick={handleCloseFormModal} flex={1}>
                Cancelar
              </Button>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                loadingText={data ? "Editando" : "Criando"}
                flex={1}
                ml={4}
                colorScheme="blue"
              >
                {data ? "Editar" : "Criar"}
              </Button>
            </Flex>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
