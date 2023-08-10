import { flexRender } from '@tanstack/react-table';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';

function SongHeader() {
  const { table } = useSongTable();

  return (
    <>
      <Table.Header>
        {table?.getHeaderGroups().map((headerGroup) => {
          {
            return headerGroup.headers.map((header) => {
              return (
                <span key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </span>
              );
            });
          }
        }) ?? null}
      </Table.Header>
    </>
  );
}

export default SongHeader;
