import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

interface StudentsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  registration: string;
  document: string;
  semester: number;
  course_id: number;
  course_name: string;
  auth_user_id: string;
}

function extractData(item?: Student): TableRow {
  if (!item) {
    return null;
  }

  return [
    item.id,
    item.name,
    item.email,
    item.registration,
    item.document,
    item.course_name,
    item.semester,
  ];
}

export function Students({ Form }: StudentsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Student>("/students");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal();

  const titles = [
    "ID",
    "Nome",
    "E-mail",
    "Matrícula",
    "CPF",
    "Curso",
    "Semestre",
  ];
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
        title="Detalhes do Estudante"
        slideOverTitles={titles}
        slideOverInfos={slideOverInfos}
        onClose={handleCloseDrawer}
        handleOpenFormModal={handleOpenFormModal}
        handleDelete={handleDeleteRegister}
      />

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
