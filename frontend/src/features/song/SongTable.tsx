import Table from '../../ui/Table';
import SongHeader from './SongHeader';
import SongBody from './SongBody';
import SongFooter from './SongFooter';
import { SongTableContextProvider } from './SongTableContext';
import { useAuth } from '../authentication/AuthContext';

function SongTable() {
  const { isAdmin } = useAuth();
  const columns = !isAdmin
    ? '1fr 1fr 1fr 1fr 1fr 1fr'
    : '1fr 1fr 1fr 1fr 1fr 1fr 25rem';

  return (
    <SongTableContextProvider>
      <Table columns={columns}>
        <SongHeader />
        <SongBody />
        <SongFooter />
      </Table>
    </SongTableContextProvider>
  );
}

export default SongTable;
