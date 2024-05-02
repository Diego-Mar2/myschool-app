import { useEffect, useState } from "react";
import {
  Table,
  Tr,
  Td,
  Th,
  Tbody,
  Thead,
  Grid,
  List,
  ListItem,
} from "@chakra-ui/react";

import Header from "../components/Header";
import SideOver from "../components/SideOver";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import {
  findCourseSubjects,
  CourseSubjects,
} from "../services/findCourseSubjects";

interface CoursesProps {
  Form: (props: any) => React.ReactNode;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

export default function Courses({ Form }: CoursesProps) {
  const [loadingAssociations, setLoadingAssociations] = useState(false);

  const { session } = useAuthContext();

  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Course, CourseSubjects[]>("/courses");

  const { isOpen, handleOpen, handleClose, handleDelete } = useDrawer(
    data,
    setData,
    handleFindById,
    handleDeleteById
  );

  useEffect(() => {
    if (!session?.access_token || !data?.id || data.associations) {
      return;
    }

    const fetchCourseSubjects = async () => {
      try {
        setLoadingAssociations(true);

        const associations = await findCourseSubjects(
          session.access_token,
          data.id
        );

        setData({
          ...data,
          associations,
        });
      } catch {
        setData(data);
      } finally {
        setLoadingAssociations(false);
      }
    };

    fetchCourseSubjects();
  }, [JSON.stringify(data)]);

  return (
    <div>
      <Header
        Form={Form}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        data={data}
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
            <Tr key={id} onClick={() => handleOpen(id)} cursor="pointer">
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isOpen && (
        <SideOver
          title="Detalhes do Curso"
          isOpen={isOpen}
          onClose={handleClose}
          handleDelete={handleDelete}
        >
          {!data && <p>Carregando...</p>}

          {data && (
            <Grid gap={5}>
              <p>
                <strong>ID:</strong> {data.id}
              </p>

              <p>
                <strong>Nome:</strong> {data.name}
              </p>

              <p>
                <strong>Descrição:</strong> {data.description}
              </p>

              {(loadingAssociations || data.associations) && (
                <div>
                  <strong>Matérias:</strong>

                  {loadingAssociations && <p>Carregando matérias...</p>}

                  <List>
                    {data.associations?.map(({ id, subject, semester }) => (
                      <ListItem key={id}>
                        {subject.name} - {semester}º Semestre
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </Grid>
          )}
        </SideOver>
      )}
    </div>
  );
}
