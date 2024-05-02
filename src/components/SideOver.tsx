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
  handleDelete: () => Promise<void>;
}

export default function SideOver({
  isOpen,
  title,
  onClose,
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
