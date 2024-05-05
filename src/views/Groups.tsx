import { useEffect, useState } from "react";
import { Grid, List, ListItem, Text, Divider } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useAuthContext } from "../contexts/AuthContext";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";
import { findGroupStudents } from "../services/findGroupStudents";
import { findGroupNotifications } from "../services/findGroupNotifications";

import type { GroupStudents } from "../services/findGroupStudents";
import type { GroupNotifications } from "../services/findGroupNotifications";

interface GroupsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Group {
  id: number;
  name: string;
  year: number;
  semester: Semester;
  subject_id: number;
  subject_name: string;
  teacher_id: number | null;
  teacher_name: string | null;
}

type Semester = "1" | "2" | "1-2";

type AdditionalData = {
  groupStudents: GroupStudents[];
  groupNotifications: GroupNotifications[];
};

function extractData(isList: boolean, item?: Group): TableRow {
  if (!item || item.id === 3) {
    return null;
  }

  const result: TableRow = [
    item.id,
    item.subject_name,
    item.name,
    item.teacher_name ?? "Professor não atribuído",
    item.year,
    item.semester,
  ];

  return isList ? [...result, "...", "..."] : result;
}

export function Groups({ Form }: GroupsProps) {
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
  } = useSectionCRUD<Group, AdditionalData>("/groups");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal();

  const titles = ["ID", "Matéria", "Turma", "Professor", "Ano", "Semestre"];
  const tableRows: TableRow[] = listData.map((item) => extractData(true, item));
  const slideOverInfos: TableRow | undefined = extractData(false, data);

  useEffect(() => {
    if (!session?.access_token || !data?.id || data.additionalData) {
      return;
    }

    const fetchAdditionalData = async () => {
      try {
        setLoadingAdditionalInfo(true);

        const [groupStudents, groupNotifications] = await Promise.all([
          findGroupStudents(session.access_token, data.id),
          findGroupNotifications(session.access_token, data.id),
        ]);

        setData({
          ...data,
          additionalData: { groupStudents, groupNotifications },
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
        tableTitles={[...titles, "Estudantes", "Notificações"]}
        tableRows={tableRows}
        handleOpenDrawer={handleOpenDrawer}
      />

      <SlideOver
        isOpen={isDrawerOpen}
        title="Detalhes da Turma"
        slideOverTitles={titles}
        slideOverInfos={slideOverInfos}
        onClose={handleCloseDrawer}
        handleOpenFormModal={handleOpenFormModal}
        handleDelete={handleDeleteRegister}
      >
        <Grid gap={5}>
          {(loadingAdditionalInfo || data?.additionalData) && (
            <>
              {loadingAdditionalInfo && (
                <>
                  <Text mt={5}>Carregando estudantes...</Text>
                  <Text>Carregando notificações...</Text>
                </>
              )}

              {data?.additionalData?.groupStudents &&
                data.additionalData.groupStudents.length > 0 && (
                  <>
                    <Text mt={5} fontWeight={700}>
                      Estudantes:
                    </Text>

                    {data.additionalData.groupStudents.map(
                      ({
                        id,
                        student: {
                          id: studentId,
                          name,
                          email,
                          course,
                          semester,
                        },
                      }) => (
                        <List key={id} mb={5}>
                          <ListItem>
                            &bull; <strong>ID:</strong> {studentId}
                          </ListItem>
                          <ListItem>
                            &bull; <strong>Nome:</strong> {name}
                          </ListItem>
                          <ListItem>
                            &bull; <strong>E-mail:</strong> {email}
                          </ListItem>
                          <ListItem>
                            &bull; <strong>Curso:</strong> {course}
                          </ListItem>
                          <ListItem>
                            &bull; <strong>Semestre:</strong> {semester}º
                          </ListItem>
                        </List>
                      ),
                    )}

                    <Divider />
                  </>
                )}

              {data?.additionalData?.groupNotifications &&
                data.additionalData.groupNotifications.length > 0 && (
                  <>
                    <Text mt={5} fontWeight={700}>
                      Notificações:
                    </Text>

                    {data.additionalData.groupNotifications.map(
                      ({
                        id,
                        notification: { title, message },
                        staff: { name },
                      }) => (
                        <List key={id} mb={5}>
                          <ListItem>
                            &bull; <strong>Enviado por:</strong> {name}
                          </ListItem>
                          {/* <ListItem>
                            &bull; <strong>Criado em:</strong> {created_at}
                          </ListItem> */}
                          <ListItem>
                            &bull; <strong>Título:</strong> {title}
                          </ListItem>
                          <ListItem>
                            &bull; <strong>Mensagem:</strong> {message}
                          </ListItem>
                        </List>
                      ),
                    )}

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
