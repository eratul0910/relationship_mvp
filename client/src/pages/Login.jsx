import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isRegister ? 'register' : 'login';
    const res = await fetch(`http://localhost:5000/api/auth/${route}`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      login(data.user);
      navigate('/chat');
    } else {
      alert('Login/Register failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isRegister ? 'Already have an account?' : 'New here?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600 font-semibold">
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
