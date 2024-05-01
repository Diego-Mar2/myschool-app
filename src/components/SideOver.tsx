import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input,  } from "@chakra-ui/react";

interface SideOverProps {
  data: any;
  isOpen: boolean;
  onClose: (_:boolean) => void;
  handleDeleteById: (id: number) => Promise<void>;
}

export default function SideOver({data, isOpen, onClose, handleDeleteById}: SideOverProps) {
  return (
    <Drawer isOpen={isOpen} onClose={() => onClose(false)}
    placement='right'
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Create your account</DrawerHeader>

      <DrawerBody>
        <Input placeholder='Type here...' />
        {JSON.stringify(data)}
      </DrawerBody>

      <DrawerFooter>
        <Button color="red" variant='outline' mr={3} onClick={() => handleDeleteById(data.id)}>
          Deletar
        </Button>
        <Button colorScheme='blue' onClick={() => onClose(false)}>Fechar</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}
