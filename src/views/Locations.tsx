import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface LocationsProps extends HeaderProps {}

interface Location {
  id: number;
  building: string;
  floor: number;
  classroom: string;
}

export default function Locations({ Form }: LocationsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Location>("/locations");
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
            <Th>Prédio</Th>
            <Th>Andar</Th>
            <Th>Sala</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({id,building,floor,classroom}) => (
            <Tr
              key={id}
              onClick={() => {
                handleFindById(id);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{id}</Td>
              <Td>{building}</Td>
              <Td>{floor > 0 ? `${floor} º` : "Térreo"}</Td>
              <Td>{classroom}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
