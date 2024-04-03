import { Table, Tr, Td, Tbody, Flex } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";
import Header, { HeaderProps } from "../components/Header";

interface ClassesProps extends HeaderProps {

}

export default function Classes({Form}: ClassesProps) {
  const { data, listData, handleFindById, handleDeleteById } = useSectionCRUD("/classes");
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
