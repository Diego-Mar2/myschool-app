import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

import type { Location } from "./Locations";

interface ClassesProps {
  Form: (props: any) => React.ReactNode;
}

export interface Class {
  id: number;
  name: string | null;
  description: string | null;
  date: string;
  start_time: string;
  end_time: string;
  subject_name: string;
  group_id: number;
  group_name: string;
  location_id: number;
  location: Omit<Location, "id">;
}

function formatDate(date: string) {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);

  return dateObj.toLocaleDateString();
}

function extractData(item: Class): TableRow {
  return [
    item.id,
    item.subject_name,
    item.group_name,
    formatDate(item.date),
    item.start_time.substring(0, 5),
    item.end_time.substring(0, 5),
    `${item.location.building}, ${
      item.location.floor > 0 ? `${item.location.floor} º andar` : "Térreo"
    }, ${item.location.classroom}`,
    item.name,
    item.description,
  ];
}

export function Classes({ Form }: ClassesProps) {
  const {
    data,
    setData,
    listData,
    handleCreate,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
  } = useSectionCRUD<Class>("/classes");

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
    "Matéria",
    "Turma",
    "Data",
    "Início",
    "Término",
    "Local",
    "Aula",
    "Descrição",
  ];
  const tableRows: TableRow[] = listData.map(extractData);
  const slideOverInfos: TableRow | undefined = data && extractData(data);

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
        title="Detalhes da Aula"
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
