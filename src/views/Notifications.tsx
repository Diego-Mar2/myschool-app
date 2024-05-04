import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

interface NotificationsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  staff_id: number;
  staff_name: string;
}

function formatDate(date: string) {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString().substring(0, 5);

  return `${formattedDate} - ${formattedTime}`;
}

function extractData(item?: Notification): TableRow {
  if (!item) {
    return null;
  }

  return [
    item.id,
    item.staff_name,
    formatDate(item.created_at),
    item.title,
    item.message,
  ];
}

export function Notifications({ Form }: NotificationsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Notification>("/notifications");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  const titles = ["ID", "Professor", "Criado em", "Título", "Descrição"];
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
        title="Detalhes da Notificação"
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
      />
    </div>
  );
}
