import React from 'react';
import { useAuth } from '../context/AuthContext';
import EmployeeDetails from '../employee/EmployeeDetails';
import './Manage.css'; 

const Manage = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="manage-container">
      {isLoggedIn ? (
        <EmployeeDetails userId={user.id} />
      ) : (
        <div className="manage-message">
          <p>
            Hey there! It looks like you haven't logged in yet.
            <br />
            Log in to view details about your account!
          </p>
        </div>
      )}
    </div>
  );
};

export default Manage;
