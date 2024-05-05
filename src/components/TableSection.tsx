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
              {row.map((column, index) => (
                <Td key={index}>{column}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
