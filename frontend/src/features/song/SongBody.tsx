import { flexRender, Row } from '@tanstack/react-table';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';
import { Song } from './types';

function SongBody() {
  const { table } = useSongTable();

  return (
    <Table.Body
      data={table?.getRowModel().rows}
      render={(row: Row<Song>) => {
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
