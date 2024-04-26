import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface GroupsProps extends HeaderProps {}

export interface Group {
  id: number;
  name: string;
  year: number;
  semester: Semester;
  subject_id: number;
  subject_name: string;
  teacher_id: number | null;
  teacher_name: string | null;
}

type Semester = "1" | "2" | "1-2";

export default function Groups({ Form }: GroupsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Group>("/groups");
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
            <Th>Matéria</Th>
            <Th>Turma</Th>
            <Th>Professor</Th>
            <Th>Ano</Th>
            <Th>Semestre</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(
            ({ id, subject_name, name, teacher_name, year, semester }) => (
              <Tr
                key={id}
                onClick={() => {
                  handleFindById(id);
                }}
                style={{ cursor: "pointer" }}
              >
                <Td>{id}</Td>
                <Td>{subject_name}</Td>
                <Td>{name}</Td>
                <Td>{teacher_name ?? "Professor não atribuído"}</Td>
                <Td>{year}</Td>
                <Td>{semester}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </div>
  );
}
