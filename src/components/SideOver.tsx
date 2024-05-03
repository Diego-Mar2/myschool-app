import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

interface SideOverProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  handleOpenFormModal: () => void;
  handleDelete: () => Promise<void>;
}

export function SideOver({
  isOpen,
  title,
  onClose,
  handleOpenFormModal,
  handleDelete,
  children,
}: PropsWithChildren<SideOverProps>) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button colorScheme="yellow" onClick={handleOpenFormModal}>
            Editar
          </Button>

          <Button color="red" variant="outline" mr={3} onClick={handleDelete}>
            Deletar
          </Button>

          <Button colorScheme="blue" onClick={onClose}>
            Fechar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
