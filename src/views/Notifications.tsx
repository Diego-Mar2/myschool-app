import { Table, Tr, Td, Tbody, Flex, Thead, Th } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface NotificationsProps extends HeaderProps {}

export interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  staff_id: number;
  staff_name: string;
}

export default function Notifications({ Form }: NotificationsProps) {
  const {
    data,
    listData,
    handleFindById,
    handleDeleteById,
    handleCreate,
    handleUpdateById,
  } = useSectionCRUD<Notification>("/notifications");
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
            <Th>Professor</Th>
            <Th>Criado em</Th>
            <Th>Título</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listData.map(({ id, staff_name, created_at, title, message }) => {
            const dateObj = new Date(created_at)
            const formattedDate = dateObj.toLocaleDateString()
            const formattedTime = dateObj.toLocaleTimeString().substring(0,5)
            return (
              <Tr
                key={id}
                onClick={() => {
                  handleFindById(id);
                }}
                style={{ cursor: "pointer" }}
              >
                <Td>{id}</Td>
                <Td>{staff_name}</Td>
                <Td>{formattedDate} - {formattedTime}</Td>
                <Td>{title}</Td>
                <Td>{message}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
