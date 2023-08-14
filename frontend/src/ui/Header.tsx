import styled from 'styled-components';
import LoginModal from '../features/authentication/LoginModal';
import Button from './Button';
import { uploadSongs as uploadSongsApi } from '../services/apiSong';
import {
  OriginalData,
  OriginalDifficultyName,
  SPDifficultyName,
  SongFormValues,
} from '../features/song/types';
import { useAuth } from '../features/authentication/AuthContext';
import { useLogout } from '../features/authentication/useLogout';

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

    const tempData: SongFormValues[] = [];

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

    uploadSongsApi(tempData);
  } catch (err) {
    console.error(err);
  }
}

const isLocalServer = (url: string) =>
  url.includes('localhost') || url.includes('http://127.0.0.1:5173/');

function Header() {
  const { logout } = useLogout();
  const { logout: authLogout, isAdmin } = useAuth();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        authLogout();
      },
    });
  };
  return (
    <StyledHeader>
      {!isAdmin && <LoginModal />}
      {isAdmin && (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          {isLocalServer(window.location.href) && (
            <Button onClick={handleUploadSongs}>Upload Songs</Button>
          )}
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
