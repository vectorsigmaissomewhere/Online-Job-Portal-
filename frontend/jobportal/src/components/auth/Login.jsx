import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // Import Link

const Login = () => {
  const [email,setEmail] = useState('');
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
        console.error('Error logging in:',  error);
        setMessage('Login failed. Please try again.');
        if(error.response && error.response.data){
          setErrors(error.response.data);
        }
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'whitesmoke',
          p: '80px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: '30px',
            }}
          >
            <b>Login</b>
          </Typography>
          <Box>
            <Typography>Email</Typography>
            <TextField
              sx={{ mb: '10px' }}
              size='small'
              label="Email"
              id="email"
              value={email}
              variant="outlined"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField
              size="small"
              sx={{ mb: '10px' }}
              label="Password"
              id="password"
              value={password}
              variant="outlined"
              margin="normal"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                backgroundColor: 'dodgerblue',
                color: "white",
                width: "18vw",
                height: "6vh",
                "&:hover": {
                    bgcolor: "green",
                },
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>

          <Typography
            sx={{
              fontSize: '12px',
              mt: '20px'
            }}
          >
            Don't have an account? <Link to='/signup' style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>Sign up</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
