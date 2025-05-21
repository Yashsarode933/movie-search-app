import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', email);
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '80px 20px 20px 20px'
    }}>
      <div style={{
        backgroundColor: '#2c2c2c',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 2px 4px #f5c518;'
      }}>
        <h2 style={{ color: '#f5c518', textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '15px',
              fontSize: '16px'
            }}
          />

          <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '20px',
              fontSize: '16px'
            }}
          />

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#f5c518',
            color: '#000',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#f5c518', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
