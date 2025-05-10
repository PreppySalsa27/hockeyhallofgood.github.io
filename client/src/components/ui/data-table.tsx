import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface DataTableColumn<T> {
  header: string;
  accessorKey: keyof T;
  cell?: ({ row }: { row: { original: T } }) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

export function DataTable<T>({ 
  columns, 
  data, 
  onRowClick,
  isLoading = false 
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof T }) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index}
                onClick={() => column.sortable && handleSort(column.accessorKey)}
                className={column.sortable ? "cursor-pointer hover:bg-gray-100" : ""}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && <SortIcon field={column.accessorKey} />}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.cell 
                      ? column.cell({ row: { original: row } })
                      : row[column.accessorKey] as React.ReactNode
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
