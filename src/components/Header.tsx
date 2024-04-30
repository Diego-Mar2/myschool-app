import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import ModalForm from "./ModalForm";

export interface HeaderProps {
  Form: (props: any) => React.ReactNode;
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  data: any;
}

export default function Header({
  Form,
  handleCreate,
  handleUpdateById,
  data,
}: HeaderProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  function handleOpen() {
    setIsCreateOpen(true);
  }

  function handleClose() {
    setIsCreateOpen(false);
  }

  return (
    <>
      <Button
        aria-label="Menu-Collapse"
        position="absolute"
        top={6}
        left={6}
        onClick={handleOpen}
      >
        + Adicionar
      </Button>

      <ModalForm
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
      </ModalForm>
    </>
  );
}
