import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Please fill in both email and password.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/loginEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.user) {
          login(data.user);
          console.log('Login successful');
        } else {
          setError('User details not found in the response.');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <label>Email:</label>
        <input className="login-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        {error && <div className="login-error">{error}</div>}
        {isLoggedIn && <Navigate to="/Manage" />}
      </form>
      <div className="login-message">
        <p>Don't have an account?</p>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
