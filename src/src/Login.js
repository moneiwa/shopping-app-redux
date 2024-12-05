

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/user');
      const users = await response.json();

      const user = users.find(user => user.name === name && user.password === password);

      if (user) {
        dispatch(login({ name, password, loggedIn: true }));
        alert('Login successful');
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className='bg-img'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input 
              type="text" 
              placeholder='Username' 
              value={name}
              onChange={e => setName(e.target.value)} 
            />
          </div>
          <div className='input-box'>
            <input 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className='forgot'>Forgot password?</a>
          </div>
          <button type='submit' className='log-btn'>Login</button>
        </form>
        <button className='reg' onClick={() => navigate('/register')}>
          Don't have an account? Register
        </button>
      </div> 
    </div>
  );
};

export default Login;
