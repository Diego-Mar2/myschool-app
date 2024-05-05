import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Grid,
  Text,
  Divider,
  Button,
  DrawerFooter,
} from "@chakra-ui/react";

import type { PropsWithChildren } from "react";
import type { TableRow } from "./TableSection";

interface SlideOverProps {
  isOpen: boolean;
  title: string;
  slideOverTitles: string[];
  slideOverInfos?: TableRow;
  loadingAdditionalInfo?: boolean;
  onClose: () => void;
  handleOpenFormModal: () => void;
  handleDelete: () => Promise<void>;
}

export function SlideOver({
  isOpen,
  title,
  slideOverTitles,
  slideOverInfos,
  loadingAdditionalInfo,
  onClose,
  handleOpenFormModal,
  handleDelete,
  children,
}: PropsWithChildren<SlideOverProps>) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>
          {!slideOverInfos ? (
            <Text>Carregando...</Text>
          ) : (
            <>
              <Grid gap={5}>
                {slideOverTitles.map((title, index) => (
                  <>
                    <Text key={index}>
                      <strong>
                        {title.endsWith("?") ? title : `${title}:`}
                      </strong>{" "}
                      {slideOverInfos[index]}
                    </Text>

                    <Divider />
                  </>
                ))}
              </Grid>

              {children}
            </>
          )}
        </DrawerBody>

        <DrawerFooter justifyContent="space-between" alignItems="center">
          <Button
            onClick={handleOpenFormModal}
            colorScheme="yellow"
            variant="outline"
            isDisabled={loadingAdditionalInfo || !slideOverInfos}
            _disabled={{ cursor: "wait" }}
          >
            Editar
          </Button>

          <Button
            onClick={handleDelete}
            color="red"
            variant="outline"
            isDisabled={loadingAdditionalInfo || !slideOverInfos}
            _disabled={{ cursor: "wait" }}
          >
            Deletar
          </Button>

          <Button onClick={onClose} colorScheme="blue">
            Fechar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
