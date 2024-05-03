import { Button, Flex, List, ListItem, theme } from "@chakra-ui/react";

import { SectionName, SectionsNames } from "../views";

import { supabase } from "../config/supabase";

interface SidebarProps {
  activeSection: SectionName;
  setActiveSection: (activeSection: SectionName) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
              w={300}
              justifyContent="flex-start"
              variant="ghost"
              colorScheme="teal"
              bg={
                activeSection === section
                  ? theme.colors.teal[50]
                  : theme.colors.transparent
              }
              onClick={() => {
                setActiveSection(section);
              }}
            >
              {section}
            </Button>
          </ListItem>
        ))}
      </List>

      <Button onClick={handleLogout}>Sair da conta</Button>
    </Flex>
  );
}
