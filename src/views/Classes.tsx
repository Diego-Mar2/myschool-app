import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";
import { Location } from "./Locations";

interface ClassesProps extends HeaderProps {}

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

export default function Classes({ Form }: ClassesProps) {
  const {
    data,
    listData,
    handleCreate,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
  } = useSectionCRUD<Class>("/classes");
  return (
    <div>
      <Header
        Form={Form}
        handleCreate={handleCreate}
        handleUpdateById={handleUpdateById}
        data={data}
      />
      {data && (
        <Flex>
          {JSON.stringify(data)}
          <button
            style={{ background: "red" }}
            onClick={() => handleDeleteById(data.id)}
          >
            deletar registro
          </button>
        </Flex>
      )}

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
              location: {building, floor,classroom},
              group_id,
              date,
              start_time,
              end_time,
            }) => {
              const dateObj = new Date(date);
              dateObj.setDate(dateObj.getDate() + 1);

              return (
                <Tr
                  key={id}
                  onClick={() => {
                    handleFindById(id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Td>{id}</Td>
                  <Td>{name}</Td>
                  <Td>{description}</Td>
                  <Td>{building}, {floor > 0 ? `${floor} º` : "Térreo"}, {classroom}</Td>
                  <Td>{group_id}</Td>
                  <Td>{dateObj.toLocaleDateString()}</Td>
                  <Td>{start_time.substring(0,5)}</Td>
                  <Td>{end_time.substring(0,5)}</Td>
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
    </div>
  );
}
