import { Button } from "@chakra-ui/react";
import { useState } from "react";

export interface HeaderProps {
  Form: (props: any) => React.ReactNode;
  handleCreate: (body: object) => Promise<void>;
  handleUpdateById: (id: number, body: object) => Promise<void>;
  data: any
}

export default function Header({ Form, handleCreate, handleUpdateById, data }: HeaderProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="Menu-Collapse"
        position="absolute"
        top={6}
        left={6}
        onClick={() => setIsCreateOpen(!isCreateOpen)}
      >
        Adicionar
      </Button>
      {isCreateOpen && <Form handleCreate={handleCreate} handleUpdateById={handleUpdateById} setIsCreateOpen={setIsCreateOpen} data={data}/>}
    </>
  );
}
