import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

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

function extractData(item?: Group): TableRow {
  if (!item || item.id === 3) {
    return null;
  }

  return [
    item.id,
    item.subject_name,
    item.name,
    item.teacher_name ?? "Professor não atribuído",
    item.year,
    item.semester,
  ];
}

export function Groups({ Form }: GroupsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Group>("/groups");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  const titles = ["ID", "Matéria", "Turma", "Professor", "Ano", "Semestre"];
  const tableRows: TableRow[] = listData.map(extractData);
  const slideOverInfos: TableRow | undefined = extractData(data);

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
        title="Detalhes da Turma"
        slideOverTitles={titles}
        slideOverInfos={slideOverInfos}
        onClose={handleCloseDrawer}
        handleOpenFormModal={handleOpenFormModal}
        handleDelete={handleDeleteRegister}
      />

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
