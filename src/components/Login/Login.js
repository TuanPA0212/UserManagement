import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoIosArrowRoundBack, IoIosEye } from 'react-icons/io';
import { toast } from 'react-toastify';
import { login } from '../../services/UserService';
import styles from './style.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../../redux/action/userAction';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate('/');
    }
  }, [account]);

  return (
    <div className={`${styles['login-container']} col-12 col-sm-4 d-grid gap-3`}>
      <div className={`${styles['login-container__title']}`}>Login</div>
      <div className={`${styles['login-container__text']}`}>
        Email or username (eve.holt@reqres.in)
      </div>
      <input
        type="text"
        placeholder="Input Email or username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className={`${styles['login-container__input-password']}`}>
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Input password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {isShowPassword ? (
          <IoIosEye className={`${styles['input-password__icon']}`} onClick={handleShowPassword} />
        ) : (
          <FaRegEyeSlash
            className={`${styles['input-password__icon']}`}
            onClick={handleShowPassword}
          />
        )}
      </div>
      <button
        className={email && password ? styles['login-container__active'] : ''}
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
        Login
      </button>
      <div className={`${styles['login-container__go-back']}`}>
        <IoIosArrowRoundBack />
        <span onClick={handleBack} className={styles['go-back__text']}>
          Go back
        </span>
      </div>
    </div>
  );
};

export default Login;
