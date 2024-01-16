import React, { useState, useEffect } from 'react';
import './EmployeeDetails.css';
import EditEmployee from './EditEmployee';
import UpdateSuccessModal from './components/UpdateSuccessModal';
import img from '../assets/employee.png';
import { MdEmail } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FcManager } from "react-icons/fc";

const EmployeeDetails = ({ userId }) => {
  const [employee, setEmployee] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccessModalOpen, setUpdateSuccessModalOpen] = useState(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  useEffect(() => {
    const username = 'test';
    const password = 'test';
    const basicAuth = btoa(`${username}:${password}`);

    fetch(`http://localhost:8080/api/getEmployee/${userId}`, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Backend Response:', data);
        setEmployee(data);
      })
      .catch((error) => console.error('Error fetching employee details:', error));
  }, [userId]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLoading(false); 
  };

  const handleUpdateSuccessModalClose = () => {
    setUpdateSuccessModalOpen(false);
  };

  return (
    <div>
      <img src={img} className="user-img" alt="Img" />
      <div className="employee-greeting">
        <h2 className="employee-greeting">{getGreeting()}👋</h2>
      </div>
      <strong className="employee-name">{employee.name}</strong>
      <div className="employee-details-container">
        <h2>About</h2>
        <div className="employee-details">
          <div className="detail">
            <FcDepartment className="department-icon"/>
            {employee.departmentId !== null ? (
              <strong className="department-text">Currently, you are actively working in Department number {employee.departmentId}.</strong>
            ) : (
              <strong className="department-text">Department information not available.</strong>
            )}
          </div>
          <div className="detail">
            <MdEmail className="email-icon"/>
            <strong className="email-text">{employee.email}</strong>
          </div>
          <div className="detail">
            <FcManager className="manager-icon"/>
            {employee.managerId === 1 ? (
              <strong className="manager-text">You hold a significant role as a Manager within our company.</strong>
            ) : (
              <strong className="employee-text">You hold the role of an employee within our company.</strong>
            )}
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
          <EditEmployee
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            userId={userId}
            onUpdate={(editedEmployee) => {
              setEmployee(editedEmployee);
              setIsLoading(true); 
              setUpdateSuccessModalOpen(true);
            }}
            onLoading={(loading) => setIsLoading(loading)}
          />
        </div>
      </div>
      <UpdateSuccessModal
        isOpen={updateSuccessModalOpen}
        onClose={handleUpdateSuccessModalClose}
      />
    </div>
  );
};

export default EmployeeDetails;
