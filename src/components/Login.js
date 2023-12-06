import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { login, currentUser, getUsers } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users when the component mounts
    getUsers();
  }, [getUsers]);

  const handleLogin = async () => {
    try {
      // Check if the username or email exists in your registered users
      const users = getUsers();
      const user = users.find((u) => u.username === username || u.email === username);

      if (!user) {
        setError('User not found. Please register first.');
        return;
      }

      // Implement the login function in your AuthContext
      await login({ username: user.username, password });

      if (currentUser) {
        navigate('/userprofile');
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>

      <div style={styles.formGroup}>
        <label htmlFor="username" style={styles.label}>
          Username: <span className="button-gap"></span>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>
          Password: <span className="button-gap"></span>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
