import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SongPage from './pages/SongPage';
import AppLayout from './ui/AppLayout';
import PageNotFound from './pages/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="songs" />} />
            <Route path="songs" element={<SongPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
