import { Fragment } from "react";
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
  Spinner,
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
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            display={"flex"}
            margin={"auto"}
            mt={360}
          />
          ) : (
            <>
              <Grid gap={5}>
                {slideOverTitles.map((title, index) => (
                  <Fragment key={title}>
                    <Text>
                      <strong>
                        {title.endsWith("?") ? title : `${title}:`}
                      </strong>{" "}
                      {slideOverInfos[index]}
                    </Text>

                    <Divider />
                  </Fragment>
                ))}
              </Grid>

              {children}
            </>
          )}
        </DrawerBody>

        <DrawerFooter justifyContent="flex-end" alignItems="center">
          <Button
            onClick={handleOpenFormModal}
            colorScheme="blue"
            isDisabled={loadingAdditionalInfo || !slideOverInfos}
            isLoading={loadingAdditionalInfo || !slideOverInfos}
            loadingText="Editar"
            flex={1}
          >
            Editar
          </Button>

          <Button
            onClick={handleDelete}
            colorScheme="red"
            isDisabled={loadingAdditionalInfo || !slideOverInfos}
            isLoading={loadingAdditionalInfo || !slideOverInfos}
            loadingText="Deletar"
            flex={1}
            ml={4}
          >
            Deletar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
