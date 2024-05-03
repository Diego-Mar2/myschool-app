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
import ModalForm from "../components/ModalForm";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";
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
  const [loadingAdditionalInfo, setLoadingAdditionalInfo] = useState(false);

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

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  useEffect(() => {
    if (!session?.access_token || !data?.id || data.additionalData) {
      return;
    }

    const fetchCourseSubjects = async () => {
      try {
        setLoadingAdditionalInfo(true);

        const additionalData = await findCourseSubjects(
          session.access_token,
          data.id,
        );

        setData({
          ...data,
          additionalData,
        });
      } catch {
        setData(data);
      } finally {
        setLoadingAdditionalInfo(false);
      }
    };

    fetchCourseSubjects();
  }, [JSON.stringify(data)]);

  return (
    <div>
      <Header handleOpenFormModal={handleOpenFormModal} />

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
            <Tr key={id} onClick={() => handleOpenDrawer(id)} cursor="pointer">
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isDrawerOpen && (
        <SideOver
          title="Detalhes do Curso"
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          handleOpenFormModal={handleOpenFormModal}
          handleDelete={handleDeleteRegister}
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

              {(loadingAdditionalInfo || data.additionalData) && (
                <div>
                  <strong>Matérias:</strong>

                  {loadingAdditionalInfo && <p>Carregando matérias...</p>}

                  <List>
                    {data.additionalData?.map(({ id, subject, semester }) => (
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

      {isFormModalOpen && (
        <ModalForm
          isOpen={isFormModalOpen}
          data={data}
          handleCreate={handleCreate}
          handleUpdateById={handleUpdateById}
          onClose={handleCloseFormModal}
          Form={Form}
        />
      )}
    </div>
  );
}
