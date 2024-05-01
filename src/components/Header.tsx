import { useState } from "react";
import { Button } from "@chakra-ui/react";
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
        Form={Form}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        data={data}
        isOpen={isCreateOpen}
        onClose={handleClose}
      />
    </>
  );
}
