import { useState } from "react"
import { HStack } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import { SectionName } from "./views";
// import { SectionsSomethings } from "./views";


function App() {

  const [activeSection, setActiveSection] = useState<SectionName>('Cursos');

  return (
    <HStack w="full" h="100vh" bg="gray.400" padding={2}>
      <Sidebar setActiveSection={setActiveSection}/>
      <Main activeSection={activeSection}/>
    </HStack >
  )
}

export default App
