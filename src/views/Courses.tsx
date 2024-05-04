import { useEffect, useState } from "react";
import { Grid, List, ListItem } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";
import {
  findCourseSubjects,
  type CourseSubjects,
} from "../services/findCourseSubjects";

interface CoursesProps {
  Form: (props: any) => React.ReactNode;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

function extractData(item?: Course): TableRow {
  if (!item) {
    return null;
  }

  return [item.id, item.name, item.description];
}

export function Courses({ Form }: CoursesProps) {
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

  const titles = ["ID", "Nome do Curso", "Descrição"];
  const tableRows: TableRow[] = listData.map(extractData);
  const slideOverInfos: TableRow | undefined = extractData(data);

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
  }, [data]);

  return (
    <div>
      <Header handleOpenFormModal={handleOpenFormModal} />

      <TableSection
        tableTitles={titles}
        tableRows={tableRows}
        handleOpenDrawer={handleOpenDrawer}
      />

      <SlideOver
        isOpen={isDrawerOpen}
        title="Detalhes do Curso"
        slideOverTitles={titles}
        slideOverInfos={slideOverInfos}
        onClose={handleCloseDrawer}
        handleOpenFormModal={handleOpenFormModal}
        handleDelete={handleDeleteRegister}
      >
        <Grid gap={5}>
          {(loadingAdditionalInfo || data?.additionalData) && (
            <div>
              <strong>Matérias:</strong>

              {loadingAdditionalInfo && <p>Carregando matérias...</p>}

              <List>
                {data?.additionalData?.map(({ id, subject, semester }) => (
                  <ListItem key={id}>
                    {subject.name} - {semester}º Semestre
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </Grid>
      </SlideOver>

      <ModalForm
        isOpen={isFormModalOpen}
        data={data}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        onClose={handleCloseFormModal}
        Form={Form}
      />
    </div>
  );
}
