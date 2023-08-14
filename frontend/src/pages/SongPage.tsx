import SongTable from '../features/song/SongTable';
import SongSelect from '../features/song/SongSelect';
import SearchSong from '../features/song/SearchSong';

function SongPage() {
  return (
    <>
      <div style={{ display: 'flex', marginLeft: 'auto', gap: '2rem' }}>
        <SearchSong />
        <SongSelect />
      </div>
      <SongTable />
    </>
  );
}
export default SongPage;
