import { Header } from "../components/Header";
import { TableSection, type TableRow } from "../components/TableSection";
import { SlideOver } from "../components/SlideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

interface LocationsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Location {
  id: number;
  building: string;
  floor: number;
  classroom: string;
}

function extractData(item?: Location): TableRow {
  if (!item) {
    return null;
  }

  return [
    item.id,
    item.building,
    item.floor > 0 ? `${item.floor} º andar` : "Térreo",
    item.classroom,
  ];
}

export function Locations({ Form }: LocationsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Location>("/locations");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  const titles = ["ID", "Prédio", "Andar", "Sala"];
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
        title="Detalhes da Localização"
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
