import { Table, Tr, Td, Button, Flex } from "@chakra-ui/react";
import { useSectionCRUD } from "../hooks/useSectionCRUD";

export default function Subjects() {
  const { data, listData, handleFindById} = useSectionCRUD('/subjects')
  return (
    <div>
      <Flex>{JSON.stringify(data)}</Flex>
      <Table>
        {listData.map((item: any) => (
          <Tr key={item.id}>
            <Td>
              <Button whiteSpace={"break-spaces"}
              onClick={() => {handleFindById(item.id)}}
              >
                {JSON.stringify(item)}
              </Button>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
