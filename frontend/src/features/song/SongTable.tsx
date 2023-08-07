import Table from '../../ui/Table';
import SongHeader from './SongHeader';
import SongBody from './SongBody';

function SongTable() {
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <SongHeader />
      <SongBody />
    </Table>
  );
}

export default SongTable;
