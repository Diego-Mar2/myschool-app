import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface SubjectsProps extends HeaderProps {}

export default function Subjects({ Form }: SubjectsProps) {
  const {
    data,
    listData,
    handleCreate,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
  } = useSectionCRUD("/subjects");
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
            <Th>Nome da Matéria</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map((item: any) => (
            <Tr
              key={item.id}
              onClick={() => {
                handleFindById(item.id);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
