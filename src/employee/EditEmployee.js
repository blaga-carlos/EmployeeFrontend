// EditEmployee.js
import React, { useState, useEffect } from 'react';
import './EditEmployee.css';

const EditEmployee = ({ isOpen, onClose, userId, onUpdate, onLoading }) => {
  const [editedEmployee, setEditedEmployee] = useState({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getEmployee/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEditedEmployee(data);
        } else {
          console.error('Error fetching employee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    if (isOpen) {
      fetchEmployeeData();
    }
  }, [isOpen, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/updateEmployee/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
      });

      if (response.ok) {
        onUpdate(editedEmployee);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose(); 
        }, 2000); 
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error.message);
    } finally {
      setLoading(false);
      onLoading(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Employee</h3>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedEmployee.name}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={editedEmployee.email}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
        {success && <div className="success-message">Update successful!</div>}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;
