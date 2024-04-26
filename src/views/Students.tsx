import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface StudentsProps extends HeaderProps {}

export interface Student {
  id: number
  name: string
  email: string
  document: string
  sr: string
  semester: string
  course_id: string
  course_name: string
  auth_user_id: string
}

export default function Students({ Form }: StudentsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Student>("/students");
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
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>CPF</Th>
            <Th>RA</Th>
            <Th>Curso</Th>
            <Th>Semestre</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({id,name,document,email,sr,semester,course_name}) => (
            <Tr
              key={id}
              onClick={() => {
                handleFindById(id);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{email}</Td>
              <Td>{document}</Td>
              <Td>{sr}</Td>
              <Td>{course_name}</Td>
              <Td>{semester}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
