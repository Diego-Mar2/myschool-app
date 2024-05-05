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
  return (
    <Modal isOpen={isOpen} onClose={handleCloseFormModal}>
      <ModalOverlay />

      <ModalContent p={4}>
        <ModalHeader>{data ? "Editar" : "Adicionar"} </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Form
            data={data}
            handleCreate={handleCreate}
            handleUpdateById={handleUpdateById}
            handleCloseFormModal={handleCloseFormModal}
            handleCloseDrawer={handleCloseDrawer}
          >
            <Flex gap={5}>
              <Button onClick={handleCloseFormModal} flex={1}>
                Cancelar
              </Button>

              <Button type="submit" colorScheme="blue" flex={1}>
                {data ? "Editar" : "Criar"}
              </Button>
            </Flex>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
