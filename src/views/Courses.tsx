import { useEffect, useState } from "react";
import { Grid, Text, List, ListItem, Divider } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";
import { findCourseSubjects } from "../services/findCourseSubjects";

import type { CourseSubjects } from "../services/findCourseSubjects";

interface CoursesProps {
  Form: (props: any) => React.ReactNode;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

function extractData(isList: boolean, item?: Course): TableRow {
  if (!item) {
    return null;
  }

  const result: TableRow = [item.id, item.name, item.description];

  return isList ? [...result, "..."] : result;
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
  } = useSectionCRUD<Course, { courseSubjects: CourseSubjects[] }>("/courses");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal();

  const titles = ["ID", "Nome do Curso", "Descrição"];
  const tableRows: TableRow[] = listData.map((item) => extractData(true, item));
  const slideOverInfos: TableRow | undefined = extractData(false, data);

  useEffect(() => {
    if (!session?.access_token || !data?.id || data.additionalData) {
      return;
    }

    const fetchAdditionalData = async () => {
      try {
        setLoadingAdditionalInfo(true);

        const courseSubjects = await findCourseSubjects(
          session.access_token,
          data.id,
        );

        setData({
          ...data,
          additionalData: { courseSubjects },
        });
      } catch {
        setData(data);
      } finally {
        setLoadingAdditionalInfo(false);
      }
    };

    fetchAdditionalData();
  }, [data]);

  return (
    <div>
      <Header handleOpenFormModal={handleOpenFormModal} />

      <TableSection
        tableTitles={[...titles, "Matérias"]}
        tableRows={tableRows}
        handleOpenDrawer={handleOpenDrawer}
      />

      <SlideOver
        isOpen={isDrawerOpen}
        title="Detalhes do Curso"
        slideOverTitles={titles}
        slideOverInfos={slideOverInfos}
        loadingAdditionalInfo={loadingAdditionalInfo}
        onClose={handleCloseDrawer}
        handleOpenFormModal={handleOpenFormModal}
        handleDelete={handleDeleteRegister}
      >
        <Grid gap={5}>
          {(loadingAdditionalInfo || data?.additionalData) && (
            <>
              {loadingAdditionalInfo && (
                <Text mt={5}>Carregando matérias...</Text>
              )}

              {data?.additionalData?.courseSubjects &&
                data.additionalData.courseSubjects.length > 0 && (
                  <>
                    <Text mt={5}>Matérias:</Text>

                    <List>
                      {data?.additionalData?.courseSubjects.map(
                        ({ id, subject, semester }) => (
                          <ListItem key={id}>
                            &bull; {subject.name} - {semester}º Semestre
                          </ListItem>
                        ),
                      )}
                    </List>

                    <Divider />
                  </>
                )}
            </>
          )}
        </Grid>
      </SlideOver>

      <ModalForm
        isOpen={isFormModalOpen}
        data={data}
        Form={Form}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        handleCloseFormModal={handleCloseFormModal}
        handleCloseDrawer={handleCloseDrawer}
      />
    </div>
  );
}
