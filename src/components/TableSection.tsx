import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface TableSectionProps {
  tableTitles: string[];
  tableRows: TableRow[];
  handleOpenDrawer: (id: number) => void;
}

export type TableRow = [number, ...Array<number | string | null>] | null;

export function TableSection({
  tableTitles,
  tableRows,
  handleOpenDrawer,
}: TableSectionProps) {
  console.log("tableRows", tableRows);

  return (
    <Table variant="striped" colorScheme="teal" size="sm">
      <Thead>
        <Tr>
          {tableTitles.map((title) => (
            <Th key={title}>{title}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {tableRows.map((row) => {
          if (row === null) {
            return null;
          }

          return (
            <Tr
              key={row[0]}
              onClick={() => handleOpenDrawer(row[0])}
              cursor="pointer"
            >
              {row.map((column) => (
                <Td key={column}>{column}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
