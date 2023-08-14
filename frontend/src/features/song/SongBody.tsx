import { flexRender, Row } from '@tanstack/react-table';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';
import { Song } from './types';
import Spinner from '../../ui/Spinner';

function SongBody() {
  const { table, isLoading } = useSongTable();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table.Body
      data={table?.getRowModel().rows ?? null}
      render={(row: Row<Song>) => {
        return (
          <Table.Row>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} style={{ minHeight: 1 }}>
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
