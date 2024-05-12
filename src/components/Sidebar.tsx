import { Button, Flex, List, ListItem, Text, theme } from "@chakra-ui/react";

import { SectionName, SectionsNames } from "../views";

import { supabase } from "../config/supabase";

import LogoUser from "../../public/imgs/user.svg";

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
      <Flex
        w={"full"}
        paddingY={8}
        borderBottom={"1px solid rgba(0, 0, 0, 0.189)"}
      >
        <img src={LogoUser} width={80} />
        <Flex display={"flex"} flexDirection={"column"}>
          <Text ml={6} mt={4}>
            Diego Martins
          </Text>
          <Text ml={6}>Reg: 12312 </Text>
        </Flex>
      </Flex>
      <List w="full">
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
