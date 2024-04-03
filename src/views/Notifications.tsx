import { Table, Tr, Td, Tbody, Flex } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface NotificationsProps extends HeaderProps {

}

export default function Notifications({Form}: NotificationsProps) {
  const { data, listData, handleFindById, handleDeleteById } = useSectionCRUD("/notifications");
  return (
    <div>
      <Header Form={Form}/>
      {data && (
        <Flex>
          {JSON.stringify(data)}
          <button
          style={{background: 'red'}}
          onClick={() => handleDeleteById(data.id)}
          >deletar registro</button>
        </Flex>
      )}

      <Table>
        <Tbody>
          {listData.map((item: any) => (
            <Tr key={item.id}>
              <Td>
                <button
                  onClick={() => {
                    handleFindById(item.id);
                  }}
                >
                  {JSON.stringify(item)}
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
