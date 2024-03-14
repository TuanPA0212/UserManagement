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

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    const resp = await login(email, password);

    if (resp && resp.token) {
      loginContext(email, resp.token);
      navigate('/');
    } else {
      if (resp && resp.status === 400) {
        toast.error(resp.message);
      }
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

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
        {loading && <FontAwesomeIcon icon={faSpinner} spin />}
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
