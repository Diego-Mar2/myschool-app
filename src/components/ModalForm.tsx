import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalProps {
  Form: (props: any) => React.ReactNode;
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function ModalForm({
  Form,
  handleCreate,
  handleUpdateById,
  isOpen,
  onClose,
  data,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>{data ? "Editar" : "Adicionar"} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            handleCreate={handleCreate}
            handleUpdateById={handleUpdateById}
            handleClose={onClose}
            data={data}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
