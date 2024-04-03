import { Flex, IconButton } from '@chakra-ui/react';
import { SectionName, Sections } from '../views';

interface MainProps {
  activeSection: SectionName
}

export default function Main({activeSection}: MainProps) {
const Section = Sections[activeSection]

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
      <IconButton
        aria-label="Menu-Collapse"
        position='absolute'
        top={6}
        left={6}
        onClick={() => null}

      />
      <Flex>
        <Section />
      </Flex>
    </Flex>
  );
}
