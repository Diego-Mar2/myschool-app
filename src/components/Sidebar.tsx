import { useEffect, useState } from "react";
import { Button, Flex, List, ListItem, Text, theme } from "@chakra-ui/react";

import { SectionName, SectionsNames } from "../views";

import { supabase } from "../config/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import { Profile, getProfile } from "../services/getProfile";

import LogoUser from "../../public/imgs/user.svg";
import LogoLogout from "../../public/imgs/logout.svg";

interface SidebarProps {
  activeSection: SectionName;
  setActiveSection: (activeSection: SectionName) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [profile, setProfile] = useState<Profile>()

  const { session } = useAuthContext();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfile(session?.access_token??'')
      setProfile(response)
    }

    fetchProfile()
  },[])

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
            {profile?.name??'...'}
          </Text>
          <Text ml={6}> Matrícula: {profile?.registration??'...'} </Text>
        </Flex>
      </Flex>
      <List w="full">
        {SectionsNames.map((section) => (
          <ListItem key={section}>
            <Button
              w={300}
              justifyContent="flex-start"
              variant="ghost"
              colorScheme="blue"
              bg={
                activeSection === section
                  ? theme.colors.blue[50]
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

      <Button
        onClick={handleLogout}
        colorScheme="blue"
        w={150}
        justifyContent={"space-between"}
      >
        Sair da conta {<img src={LogoLogout} width={20} />}
      </Button>
    </Flex>
  );
}
