import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SideOverProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  handleDeleteById: (id: number) => Promise<void>;
  slideOverCallback?: () => Promise<any>;
}

export default function SideOver({
  data,
  isOpen,
  onClose,
  handleDeleteById,
  slideOverCallback,
}: SideOverProps) {
  const [dataWithAssociations, setDataWithAssociations] = useState(data);

  useEffect(() => {
    if (data && slideOverCallback) {
      const fetchAssociations = async () => {
        try {
          const associations = await slideOverCallback();

          setDataWithAssociations({
            ...data,
            associations,
          });
        } catch {
          setDataWithAssociations(data);
        }
      };

      fetchAssociations();
    }
  }, [data]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
          {JSON.stringify(dataWithAssociations)}
        </DrawerBody>

        <DrawerFooter>
          <Button
            color="red"
            variant="outline"
            mr={3}
            onClick={() => handleDeleteById(data.id)}
          >
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
