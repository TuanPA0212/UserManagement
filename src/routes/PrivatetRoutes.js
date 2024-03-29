import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Alert } from 'react-bootstrap';

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Please Login First</Alert.Heading>
        <p>You don't have permission to access this page</p>
      </Alert>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoutes;
