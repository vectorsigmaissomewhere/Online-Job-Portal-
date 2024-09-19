import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    axios.post('http://127.0.0.1:8000/api/user/login/', userCredentials)
      .then(response => {
        setEmail('');
        setPassword('');
        setMessage('Login Successful');
        setErrors({});

        // Store tokens in localStorage
        localStorage.setItem('refreshToken', response.data.token.refresh);
        localStorage.setItem('accessToken', response.data.token.access);

        // Redirect to userprofile
        navigate('/userprofile');
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setMessage('Login failed. Please try again.');
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-100 p-20 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <h5 className="text-center text-xl font-bold mb-8">Login</h5>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white w-1/2 py-2 rounded hover:bg-green-500 transition duration-200"
              type="submit"
            >
              Submit
            </button>
          </div>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{' '}
            <Link to='/signup' className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
