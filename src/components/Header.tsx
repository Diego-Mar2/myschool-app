import { Button } from "@chakra-ui/react";

export interface HeaderProps {
  handleOpenFormModal: () => void;
}

export function Header({ handleOpenFormModal }: HeaderProps) {
  return (
    <Button
      aria-label="Menu-Collapse"
      position="absolute"
      top={6}
      left={6}
      onClick={handleOpenFormModal}
    >
      + Adicionar
    </Button>
  );
}
