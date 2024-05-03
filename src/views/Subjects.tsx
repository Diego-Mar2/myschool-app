import { Table, Tr, Td, Th, Tbody, Thead, Grid } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { SideOver } from "../components/SideOver";
import { ModalForm } from "../components/ModalForm";

import { useSectionCRUD } from "../hooks/useSectionCRUD";
import { useDrawer } from "../hooks/useDrawer";
import { useFormModal } from "../hooks/useFormModal";

interface SubjectsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
}

export function Subjects({ Form }: SubjectsProps) {
  const {
    data,
    setData,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Subject>("/subjects");

  const {
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleDeleteRegister,
  } = useDrawer(data, setData, handleFindById, handleDeleteById);

  const { isFormModalOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal(handleCloseDrawer);

  return (
    <div>
      <Header handleOpenFormModal={handleOpenFormModal} />

      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome da Matéria</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>

        <Tbody>
          {listData.map(({ id, name, description }) => (
            <Tr
              key={id}
              onClick={() => {
                handleOpenDrawer(id);
              }}
              cursor="pointer"
            >
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isDrawerOpen && (
        <SideOver
          title="Detalhes da Matéria"
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
