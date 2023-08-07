import { useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type DifficultyNumber = Range<1, 20>;
type OriginalDifficultyName =
  | 'BEGINNER'
  | 'LIGHT'
  | 'STANDARD'
  | 'HEAVY'
  | 'CHALLENGE';

type OriginalData = Record<
  string,
  Record<OriginalDifficultyName, { level: DifficultyNumber | null }>
>;

// https://stackoverflow.com/questions/69635210/typescript-cannot-declare-additional-properties-on-mapped-types
type SongDifficulties = {
  [P in keyof OriginalDifficultyName as `${Lowercase<OriginalDifficultyName>}`]: DifficultyNumber | null;
};

type MappedSongDifficulties = {
  [P in keyof SongDifficulties as `${Lowercase<P>}Difficulty`]: SongDifficulties[P];
};

type Song = MappedSongDifficulties & {
  name: string;
};

const defaultColumns: ColumnDef<Song>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Difficulty',
    footer: (props) => props.column.id,
    columns: [
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
    ],
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

function App() {
  const [data, setData] = useState<Song[]>([]);
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  // const rerender = () => setData(() => makeData(20));

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

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
