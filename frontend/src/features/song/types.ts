import { Range } from '../../utils/types';

export type DifficultyNumber = Range<1, 20>;
export type OriginalDifficultyName =
  | 'BEGINNER'
  | 'LIGHT'
  | 'STANDARD'
  | 'HEAVY'
  | 'CHALLENGE';

export type OriginalData = Record<
  string,
  Record<OriginalDifficultyName, { level: DifficultyNumber | null }>
>;

// https://stackoverflow.com/questions/69635210/typescript-cannot-declare-additional-properties-on-mapped-types
export type SongDifficulties = {
  [P in keyof OriginalDifficultyName as `${Lowercase<OriginalDifficultyName>}`]: DifficultyNumber | null;
};

export type MappedSongDifficulties = {
  [P in keyof SongDifficulties as `${Lowercase<P>}Difficulty`]: SongDifficulties[P];
};

export type Song = MappedSongDifficulties & {
  name: string;
};
