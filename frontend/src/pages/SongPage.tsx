import SongTable from '../features/song/SongTable';
import SongSelect from '../features/song/SongSelect';

function SongPage() {
  return (
    <>
      <div style={{ display: 'flex', marginLeft: 'auto' }}>
        <SongSelect />
      </div>
      <SongTable />
    </>
  );
}
export default SongPage;
