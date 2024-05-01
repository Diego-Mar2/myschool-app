import { useState } from "react";
import { Table, Tr, Td, Th, Tbody, Thead } from "@chakra-ui/react";

import Header from "../components/Header";
import SideOver from "../components/SideOver";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { findCourseSubjects } from "../services/findCourseSubjects";

interface CoursesProps {
  Form: (props: any) => React.ReactNode;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

interface CourseSubjects {
  id: number;
  semester: number;
  subject: {
    id: number;
    name: string;
  };
}

export default function Courses({ Form }: CoursesProps) {
  const [sideOpen, setSideOpen] = useState(false);

  const { session } = useAuthContext();
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Course>("/courses");

  function handleClose() {
    setSideOpen(false);
    setData(undefined);
  }

  const slideOverCallback = async (): Promise<CourseSubjects[] | void> => {
    if (!session?.access_token || !data?.id) {
      return;
    }

    return findCourseSubjects(session.access_token, data.id);
  };

  return (
    <div>
      <Header
        Form={Form}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        data={data}
      />

      <SideOver
        data={data}
        isOpen={sideOpen}
        onClose={handleClose}
        handleDeleteById={handleDeleteById}
        slideOverCallback={slideOverCallback}
      />

      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome do Curso</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({ id, name, description }) => (
            <Tr
              key={id}
              onClick={() => {
                handleFindById(id);
                setSideOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
