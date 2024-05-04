import { useState } from "react";
import { HStack } from "@chakra-ui/react";

import { Login } from "./views/Login";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";

import { useAuthContext } from "./contexts/AuthContext";

import type { SectionName } from "./views";

export function App() {
  const [activeSection, setActiveSection] = useState<SectionName>("Cursos");
  const { session } = useAuthContext();

  if (!session) {
    return <Login />;
  }

  return (
    <HStack w="full" h="100vh" bg="gray.200" padding={2}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Main activeSection={activeSection} />
    </HStack>
  );
}
