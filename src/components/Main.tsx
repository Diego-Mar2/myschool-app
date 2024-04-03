import { Flex } from "@chakra-ui/react";
import { SectionName, Sections } from "../views";

interface MainProps {
  activeSection: SectionName;
}

export default function Main({ activeSection }: MainProps) {

  const { component: Component, form: Form } = Sections[activeSection];

  return (
    <Flex
      as="main"
      w="full"
      h="full"
      bg="white"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
      borderRadius="3xl"
    >

      <Flex>
        <Component Form={Form} />
      </Flex>
    </Flex>
  );
}
