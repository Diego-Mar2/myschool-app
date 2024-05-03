import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header from "../components/Header";

interface SubjectsProps {
  Form: (props: any) => React.ReactNode;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
}

export default function Subjects({ Form }: SubjectsProps) {
  const {
    data,
    listData,
    handleCreate,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
  } = useSectionCRUD<Subject>("/subjects");
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
      <Flex>{JSON.stringify(data)}</Flex>
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
                handleFindById(id);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
