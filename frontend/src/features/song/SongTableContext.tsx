import { createContext, useContext, useMemo } from 'react';
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Song } from './types';
import useGetSongs from './useGetSongs';
import { useAuth } from '../authentication/AuthContext';
import EditSong from './EditSong';
import DeleteSong from './DeleteSong';

const SongTableContext = createContext<{
  table: Table<Song> | null;
  isLoading: boolean;
  pageCount: number;
}>({
  table: null,
  isLoading: false,
  pageCount: 0,
});

// why emptyArray?
// ref: https://github.com/TanStack/table/issues/4240
const emptyArray: Song[] = [];

function SongTableContextProvider({ children }: { children: JSX.Element }) {
  const { isAdmin } = useAuth();

  const columns: ColumnDef<Song>[] = useMemo(
    () =>
      !isAdmin
        ? [
            {
              header: 'Name',
              accessorKey: 'name',
            },
            {
              accessorKey: 'beginnerDifficulty',
              header: () => 'Beginner',
            },
            {
              accessorKey: 'lightDifficulty',
              header: () => 'Light',
            },
            {
              accessorKey: 'standardDifficulty',
              header: () => 'Standard',
            },
            {
              accessorKey: 'heavyDifficulty',
              header: () => 'Heavy',
            },
            {
              accessorKey: 'challengeDifficulty',
              header: () => 'Challenge',
            },
          ]
        : [
            {
              header: 'Name',
              accessorKey: 'name',
            },
            {
              accessorKey: 'beginnerDifficulty',
              header: () => 'Beginner',
            },
            {
              accessorKey: 'lightDifficulty',
              header: () => 'Light',
            },
            {
              accessorKey: 'standardDifficulty',
              header: () => 'Standard',
            },
            {
              accessorKey: 'heavyDifficulty',
              header: () => 'Heavy',
            },
            {
              accessorKey: 'challengeDifficulty',
              header: () => 'Challenge',
            },
            {
              header: () => 'Operations',
              id: 'operations',
              cell: (info) => (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <EditSong id={info.row.original.id} />
                  <DeleteSong
                    id={info.row.original.id}
                    name={info.row.original.name ?? ''}
                  />
                </div>
              ),
            },
          ],
    [isAdmin]
  );

  const { songs, pageCount, isLoading } = useGetSongs();

  const table = useReactTable({
    data: songs ?? emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pageCount,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  return (
    <SongTableContext.Provider value={{ table, isLoading, pageCount }}>
      {children}
    </SongTableContext.Provider>
  );
}

function useSongTable() {
  const context = useContext(SongTableContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { useSongTable, SongTableContextProvider };
