import React, { useState, useEffect } from 'react';
import './DepartmentList.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const username = 'test';
  const password = 'test';

  useEffect(() => {
    const basicAuth = btoa(`${username}:${password}`);
    fetch('http://localhost:8080/api/getAllDepartments', {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Backend Response:', data);
        setDepartments(data);
      })
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  return (
    <div className="department-list-card">
      <h2>Department List</h2>
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>MANAGER ID</th>
            <th>PARENT ID</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.description}</td>
              <td>{department.managerId}</td>
              <td>{department.parentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
