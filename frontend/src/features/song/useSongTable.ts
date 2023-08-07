import { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Song, OriginalData, MappedSongDifficulties } from './types';

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

function isMappedSongDifficulty(
  str: string
): str is keyof MappedSongDifficulties {
  return [
    'beginnerDifficulty',
    'lightDifficulty',
    'standardDifficulty',
    'heavyDifficulty',
    'challengeDifficulty',
  ].includes(str);
}

function useSongTable() {
  const [data, setData] = useState<Song[]>([]);
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  useEffect(() => {
    async function fetchSingleData() {
      try {
        const res = await fetch('/data/singleData.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const originalData = (await res.json()) as OriginalData;
        setData(() => {
          const tempData: Song[] = [];

          Object.keys(originalData).forEach((songName) => {
            const song: Song = {
              name: '',
              beginnerDifficulty: null,
              lightDifficulty: null,
              standardDifficulty: null,
              heavyDifficulty: null,
              challengeDifficulty: null,
            };

            song.name = songName;
            Object.keys(originalData[songName]).forEach((difficultyName) => {
              const concatedSongDifficulty = `${difficultyName.toLowerCase()}Difficulty`;
              if (
                isMappedSongDifficulty(concatedSongDifficulty) &&
                originalData[songName][difficultyName as OriginalDifficultyName]
              ) {
                song[concatedSongDifficulty] =
                  originalData[songName][
                    difficultyName as OriginalDifficultyName
                  ].level;
              }
            });
            tempData.push(song);
          });
          return tempData;
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchSingleData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return { table, data, setData };
}

export default useSongTable;
