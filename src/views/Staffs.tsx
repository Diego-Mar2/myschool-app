import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface StaffsProps extends HeaderProps {

}

interface Staff {
  id: number
  name: string
  email: string
  document: string
  is_admin: boolean
  auth_user_id: string
}

export default function Staffs({Form}: StaffsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Staff>("/staff");
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

<Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>CPF</Th>
            <Th>É administrador?</Th>

          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({id,name,email,document,is_admin}) => (
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
              <Td>{is_admin ? "sim" : "não"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
