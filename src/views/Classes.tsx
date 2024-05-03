import { Table, Tr, Td, Th, Tbody, Thead, Grid } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { SideOver } from "../components/SideOver";
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
  group_id: number;
  location_id: number;
  location: Omit<Location, "id">;
}

function formatDate(date: string) {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);

  return dateObj.toLocaleDateString();
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
    useFormModal(handleCloseDrawer);

  return (
    <div>
      <Header handleOpenFormModal={handleOpenFormModal} />

      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Aula</Th>
            <Th>Descrição</Th>
            <Th>Local</Th>
            <Th>Turma</Th>
            <Th>Data</Th>
            <Th>Início</Th>
            <Th>Término</Th>
          </Tr>
        </Thead>

        <Tbody>
          {listData.map(
            ({
              id,
              name,
              description,
              location: { building, floor, classroom },
              group_id,
              date,
              start_time,
              end_time,
            }) => (
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
                <Td>
                  {building}, {floor > 0 ? `${floor} º andar` : "Térreo"},{" "}
                  {classroom}
                </Td>
                <Td>{group_id}</Td>
                <Td>{formatDate(date)}</Td>
                <Td>{start_time.substring(0, 5)}</Td>
                <Td>{end_time.substring(0, 5)}</Td>
              </Tr>
            ),
          )}

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
                    <strong>Aula:</strong> {data.name}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {data.description}
                  </p>

                  <p>
                    <strong>Local:</strong> {data.location.building},{" "}
                    {data.location.floor > 0
                      ? `${data.location.floor} º andar`
                      : "Térreo"}
                    , {data.location.classroom}
                  </p>
                  <p>
                    <strong>Turma:</strong> {data.group_id}
                  </p>
                  <p>
                    <strong>Data:</strong> {formatDate(data.date)}
                  </p>
                  <p>
                    <strong>Início:</strong> {data.start_time.substring(0, 5)}
                  </p>
                  <p>
                    <strong>Término:</strong> {data.end_time.substring(0, 5)}
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
        </Tbody>
      </Table>
    </div>
  );
}
