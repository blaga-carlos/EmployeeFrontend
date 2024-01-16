import React, { useState, useEffect } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const username = 'test';
  const password = 'test';

  useEffect(() => {
    const basicAuth = btoa(`${username}:${password}`);
    fetch('http://localhost:8080/api/getAllEmployees', {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Backend Response:', data);
        setEmployees(data);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="employee-list-card">
      <h2>Employee List</h2>
      <div className="employee-list-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DEPARTMENT ID</th>
              <th>EMAIL</th>
              <th>MANAGER ID</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.departmentId !== null ? employee.departmentId : 'N/A'}</td>
                <td>{employee.email}</td>
                <td>{employee.managerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
