import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import Login from '../components/Login/Login';
import TableUsers from '../components/TableUsers/TableUsers';
import PrivateRoutes from './PrivatetRoutes';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
