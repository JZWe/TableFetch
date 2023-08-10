import { flexRender } from '@tanstack/react-table';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';

function SongHeader() {
  const { table } = useSongTable();
  console.log('SongHeader');
  return (
    <>
      <Table.Header>
        {table?.getHeaderGroups().map((headerGroup) => {
          {
            return headerGroup.headers.map((header) => (
              <span key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </span>
            ));
          }
        })}
      </Table.Header>
    </>
  );
}

export default SongHeader;
