import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css';
import reactLogo from '../assets/employees.png';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const setGoToHome = () => {
    navigate('/');
  }

  return (
    <div>
      <header>
        <img onClick={setGoToHome} src={reactLogo} className="logo" alt="LOGO" />
        <nav>
          <ul className="nav-links">
            <li>
              <Link to='/' className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/Manage' className={location.pathname === '/Manage' ? 'active' : ''}>
                Manage
              </Link>
            </li>
          </ul>
        </nav>
        {isLoggedIn ? ( 
          <button onClick={logout} className="btn">LOGOUT</button>
        ) : (
          <Link to='/Login' className="btn"><button>LOGIN</button></Link>
        )}
      </header>
    </div>
  );
};

export default Navbar;
