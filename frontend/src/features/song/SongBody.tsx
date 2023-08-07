import { flexRender } from '@tanstack/react-table';
import Table from '../../ui/Table';
import useSongTable from './useSongTable';

function SongBody() {
  const { table } = useSongTable();

  return (
    <Table.Body
      data={table.getRowModel().rows}
      render={(row) => (
        <Table.Row>
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </Table.Row>
      )}
    />
  );
}

export default SongBody;
