import { Button, Flex, List, ListItem } from "@chakra-ui/react";
import { SectionName, SectionsNames } from "../views";

interface SidebarProps {
  setActiveSection: (activeSection: SectionName) => void;
}

export default function Sidebar({ setActiveSection }: SidebarProps) {
  return (
    <Flex
      as="aside"
      w="full"
      h="full"
      maxW={350}
      bg="white"
      alignItems="start"
      padding={6}
      flexDirection="column"
      justifyContent="space-between"
      transition="ease-in-out .2s"
      borderRadius="3xl"
    >
      <List w="full" my={8}>
        {SectionsNames.map((section) => (
          <ListItem key={section}>
            <Button
            variant="ghost"
            colorScheme='teal'
            w={300}
            justifyContent="flex-start"

              onClick={() => {
                setActiveSection(section);
              }}
            >
              {section}
            </Button>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
