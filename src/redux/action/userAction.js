import { toast } from 'react-toastify';
import { login } from '../../services/UserService';

export const USER_LOGIN = 'USER_LOGIN';

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let resp = await login(email, password);

    if (resp && resp.token) {
      localStorage.setItem('token', resp.token);
      localStorage.setItem('email', email);
      dispatch({ type: FETCH_USER_SUCCESS, data: { email, token: resp.token } });

      //   navigate('/');
    } else {
      if (resp && resp.status === 400) {
        toast.error(resp.message);
      }
      dispatch({ type: FETCH_USER_ERROR });
    }
  };
};

export const handleLogoutRedux = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_REFRESH,
    });
  };
};
