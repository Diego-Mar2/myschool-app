import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form } from "react-hook-form";

interface ModalProps {
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  handleClose: () => void;
  data: any;
}

export default function ModalForm({
  handleCreate,
  handleUpdateById,
  handleClose,
  data,
}: ModalProps) {

  return (
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isCreateOpen}
        onClose={handleClose}
      >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>Adicionar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            handleCreate={handleCreate}
            handleUpdateById={handleUpdateById}
            handleClose={handleClose}
            data={data}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
