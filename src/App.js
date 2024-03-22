import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Header from './common/Header';

import TableUsers from './components/TableUsers/TableUsers';
import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/action/userAction';

function App() {
  const dataUserRedux = useSelector((state) => state.user.account);

  console.log('redux', dataUserRedux);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleRefresh());
  }, []);

  // const { user, loginContext } = useContext(UserContext);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
  //   }
  // }, []);

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
