import { Button } from "@chakra-ui/react";
import { useState } from "react";

export interface HeaderProps {
  Form:() => React.ReactNode
}

export default function Header({Form}:HeaderProps) {
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
      {isCreateOpen && <Form />}
    </>
  );
}
