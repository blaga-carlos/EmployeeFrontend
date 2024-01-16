import React from 'react'
import EmployeeList from '../employee/EmployeeList'
import DepartmentList from '../department/DeparmentList'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
    <EmployeeList />
    <DepartmentList />
    </div>
    
  )
}

export default Home