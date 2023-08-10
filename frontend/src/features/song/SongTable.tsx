import Table from '../../ui/Table';
import SongHeader from './SongHeader';
import SongBody from './SongBody';
import SongFooter from './SongFooter';
import { SongTableContextProvider } from './SongTableContext';

function SongTable() {
  return (
    <SongTableContextProvider>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 20rem">
        <SongHeader />
        <SongBody />
        <SongFooter />
      </Table>
    </SongTableContextProvider>
  );
}

export default SongTable;
