import {
  OriginalData,
  OriginalDifficultyName,
  SPDifficultyName,
  SongFormValues,
} from './types';
import Button from '../../ui/Button';
import useUploadSongs from './useUploadSongs';

function isMappedSongDifficulty(str: string): str is SPDifficultyName {
  return [
    'beginnerDifficulty',
    'lightDifficulty',
    'standardDifficulty',
    'heavyDifficulty',
    'challengeDifficulty',
  ].includes(str);
}

// Get form value with null in fields
const getInitialFormValues = (): SongFormValues => {
  return {
    name: null,
    beginnerDifficulty: null,
    lightDifficulty: null,
    standardDifficulty: null,
    heavyDifficulty: null,
    challengeDifficulty: null,
  };
};

async function getDataFromJson() {
  const tempData: SongFormValues[] = [];

  try {
    const res = await fetch('/data/singleData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const originalData = (await res.json()) as OriginalData;

    Object.keys(originalData).forEach((songName) => {
      const newSong = getInitialFormValues();
      newSong.name = songName;
      Object.keys(originalData[songName]).forEach((difficultyName) => {
        const concatedSongDifficulty = `${difficultyName.toLowerCase()}Difficulty`;
        if (
          isMappedSongDifficulty(concatedSongDifficulty) &&
          originalData[songName][difficultyName as OriginalDifficultyName]
        ) {
          newSong[concatedSongDifficulty] =
            originalData[songName][
              difficultyName as OriginalDifficultyName
            ].level;
        }
      });
      tempData.push(newSong);
    });
  } catch (err) {
    console.error(err);
  }

  return tempData;
}

const isLocalServer = (url: string) =>
  url.includes('localhost') || url.includes('127.0.0.1');

export default function UploadSongs() {
  const { uploadSongs } = useUploadSongs();
  return (
    isLocalServer(window.location.href) && (
      <Button
        onClick={async () => {
          const songs = await getDataFromJson();
          uploadSongs({ songs });
        }}
      >
        Upload Songs
      </Button>
    )
  );
}
