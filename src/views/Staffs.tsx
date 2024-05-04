import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

interface StaffsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  registration: string;
  document: string;
  is_admin: boolean;
  auth_user_id: string;
}

function extractData(item?: Staff): TableRow {
  if (!item) {
    return null;
  }

  return [
    item.id,
    item.name,
    item.email,
    item.registration,
    item.document,
    item.is_admin ? "sim" : "não",
  ];
}

export function Staffs({ Form }: StaffsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Staff>("/staff");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  const titles = [
    "ID",
    "Nome",
    "E-mail",
    "Matrícula",
    "CPF",
    "É administrador?",
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
        title="Detalhes do Funcionário"
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
