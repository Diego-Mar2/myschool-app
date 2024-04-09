import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface GroupsProps extends HeaderProps {

}

export default function Groups({Form}: GroupsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD("/groups");
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
          style={{background: 'red'}}
          onClick={() => handleDeleteById(data.id)}
          >deletar registro</button>
        </Flex>
      )}

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Nome do Grupo</Th>
            <Th>Semestre</Th>
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
              <Td>{item.semester}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
