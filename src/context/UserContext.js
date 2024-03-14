import { createContext, useState } from 'react';

const UserContext = createContext({ email: '', auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', auth: false });

  const loginContext = (email, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setUser({
      email: email,
      auth: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser({
      email: '',
      auth: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
