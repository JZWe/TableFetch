import styled from 'styled-components';
import Button from './Button';
import { uploadSongs as uploadSongsApi } from '../services/apiSong';
import {
  Song,
  OriginalData,
  OriginalDifficultyName,
  SPDifficultyName,
} from '../features/song/types';
import { useAuth } from '../features/authentication/AuthContext';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function isMappedSongDifficulty(str: string): str is SPDifficultyName {
  return [
    'beginnerDifficulty',
    'lightDifficulty',
    'standardDifficulty',
    'heavyDifficulty',
    'challengeDifficulty',
  ].includes(str);
}

async function handleUploadSongs() {
  try {
    const res = await fetch('/data/singleData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const originalData = (await res.json()) as OriginalData;

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

    uploadSongsApi(tempData);
  } catch (err) {
    console.error(err);
  }
}

function Header() {
  const { login, logout, isAdmin } = useAuth();
  return (
    <StyledHeader>
      {!isAdmin && <Button onClick={login}>Login</Button>}
      {isAdmin && (
        <>
          <Button onClick={logout}>Logout</Button>
          <Button onClick={handleUploadSongs}>Upload Songs</Button>
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
