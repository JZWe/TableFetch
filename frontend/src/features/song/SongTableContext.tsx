import { createContext, useContext, useState } from 'react';
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Song } from './types';
import useGetSongs from './useGetSongs';

const defaultColumns: ColumnDef<Song>[] = [
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
];

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
  const { songs, pageCount, isLoading } = useGetSongs();

  const [columns] = useState(() => [...defaultColumns]);

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
