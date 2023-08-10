import { flexRender } from '@tanstack/react-table';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';

function SongBody() {
  const { table } = useSongTable();

  return (
    <Table.Body
      data={table?.getRowModel().rows}
      render={(row) => {
        return (
          <Table.Row>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </Table.Row>
        );
      }}
    ></Table.Body>
  );
}

export default SongBody;
