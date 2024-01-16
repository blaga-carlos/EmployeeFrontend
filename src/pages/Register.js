import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all required fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/registerEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/Login', { state: { successMessage: 'Registration successful. You can now log in.' } });
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <label>Name:</label>
        <input className="register-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input className="register-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Confirm Password:</label>
        <input className="register-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <br />
        <button className="register-button" type="button" onClick={handleRegister}>Register</button>
      </form>

      {error && <div className="register-error">{error}</div>}

      <div className="register-message">
        <p>Already have an account?</p>
        <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
