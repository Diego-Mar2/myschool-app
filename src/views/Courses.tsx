import { Table, Tr, Td, Th, Tbody, Flex, Thead } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface CoursesProps extends HeaderProps {}

export interface Course {
  id: number
  name: string
  description: string
}

export default function Courses({ Form }: CoursesProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Course>("/courses");
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
            <Th>Nome do Curso</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({id, name, description}) => (
            <Tr
              key={id}
              onClick={() => {
                handleFindById(id);
              }}
              style={{ cursor: 'pointer' }}
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
