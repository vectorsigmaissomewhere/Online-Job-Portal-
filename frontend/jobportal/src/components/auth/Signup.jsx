import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [tc, setTc] = useState(true);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== conPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const newUser = {
      email,
      name,
      password,
      password2: conPassword,
      tc: tc.toString(),
    };

    axios.post('http://127.0.0.1:8000/api/user/register/', newUser)
      .then(response => {
        setEmail('');
        setName('');
        setPassword('');
        setConPassword('');
        setTc(true);
        setMessage('Registration Successful');
        setErrors({});
        console.log('User registered successfully: ', response.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
        setMessage('Registration failed. Please try again.');
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-[68vh]">
      <div className="bg-gray-100 p-20 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <h5 className="text-center text-xl font-bold mb-8">Signup</h5>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={tc}
                onChange={() => setTc(!tc)}
              />
              <span className="ml-2">Accept Terms and Conditions</span>
            </label>
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
            Already have an account?{' '}
            <Link to='/login' className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
        <div className="mt-4">
          {message && (
            <div className={`p-4 mb-4 text-sm rounded ${message.includes('Successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="p-4 mb-4 text-sm bg-red-100 text-red-700 rounded">
              <ul>
                {Object.keys(errors).map((key, index) => (
                  <li key={index}>{`${key}: ${errors[key]}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
