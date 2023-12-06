// AdminProfile.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
  return (
    <div>
      <h2>Admin Profile</h2>
      {/* Other admin profile content */}
      <Link to="/admindashboard">Go to Admin Dashboard</Link>
    </div>
  );
};

export default AdminProfile;
