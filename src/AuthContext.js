// AuthContext.js
import { createContext, useContext, useState } from 'react';

// AuthContext.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const login = (userData) => {
    // 登录逻辑，设置用户信息
    setUser(userData);
  };

  const logout = () => {
    // 登出逻辑，清除用户信息
    setUser(null);
  };

  const register = (userData) => {
    // 注册逻辑，设置用户信息
    setUser(userData);
    // 更新用户列表
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const getUsers = () => {
    return users;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
