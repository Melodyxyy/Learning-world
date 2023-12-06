import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  const navigateToAdmin = () => {
    history.push('/admin');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToAdmin}>Go to Admin Dashboard</button>
    </div>
  );
};

export default HomePage;
