//learning-world/src/components/Register.js


import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, currentUser, getUsers } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validate username, password, email, and phone
    if (username.length < 2 || password.length < 8 || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    // Check if the username is already registered
    const users = getUsers();
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError('Username is already registered. Please choose a different username.');
      return;
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one uppercase letter, one symbol, and one digit.');
      return;
    }

    try {
      // Execute registration logic
      await register({ username, password, email, phone});

      // Display success message
      alert('Registration successful! Thank you for joining.');

      // Redirect to UserProfile.js after registration only if the user is logged in
      if (currentUser) {
        navigate('/userprofile');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>

      <label htmlFor="username" style={styles.label}>
        Username: <span className="button-gap"></span>
        <input
          type="text"
          id="username"
          autoComplete="username" // Add autoComplete attribute
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />

      <label htmlFor="password" style={styles.label}>
        Password: <span className="button-gap"></span>
        <input
          type="password"
          id="password"
          autoComplete="new-password" // Add autoComplete attribute
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />

      <label htmlFor="email" style={styles.label}>
        Email: <span className="button-gap"></span>
        <input
          type="email"
          id="email"
          autoComplete="email" // Add autoComplete attribute
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />

      <label htmlFor="phone" style={styles.label}>
        Phone: <span className="button-gap"></span>
        <input
          type="tel"
          id="phone"
          autoComplete="tel" // Add autoComplete attribute
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleRegister} style={styles.button}>
        Register
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

export default Register;
