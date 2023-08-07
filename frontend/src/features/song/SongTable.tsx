import Table from '../../ui/Table';
import SongHeader from './SongHeader';
import SongBody from './SongBody';

function SongTable() {
  return (
    <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 20rem">
      <SongHeader />
      <SongBody />
    </Table>
  );
}

export default SongTable;
