import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Checkbox, Link, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '68vh',
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
            <b>Signup</b>
          </Typography>
          <Box>
            <Typography>Email</Typography>
            <TextField
              sx={{ mb: '10px' }}
              size='small'
              label="Email"
              value={email}
              variant="outlined"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <Typography>Full Name</Typography>
            <TextField
              sx={{ mb: '10px' }}
              size='small'
              label="Full Name"
              value={name}
              variant="outlined"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField
              size="small"
              sx={{ mb: '10px' }}
              label="Password"
              value={password}
              variant="outlined"
              margin="normal"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Typography>Confirm Password</Typography>
            <TextField
              size="small"
              sx={{ mb: '10px' }}
              label="Confirm Password"
              value={conPassword}
              variant="outlined"
              margin="normal"
              type="password"
              onChange={(e) => setConPassword(e.target.value)}
            />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Accept Terms and Conditions"
              required
              checked={tc}
              onChange={(e) => setTc(!tc)}
            />
          </FormGroup>
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
            Already have an account? <Link to='/login' style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>Login</Link>
          </Typography>
        </form>
        <Stack sx={{ width: '100%' }} spacing={2}>
  {message && (
    <Alert severity={message.includes('Successful') ? 'success' : 'error'}>
      <p>{message}</p>
    </Alert>
  )}
  {Object.keys(errors).length > 0 && (
    <Alert severity="error">
      <ul>
        {Object.keys(errors).map((key, index) => (
          <li key={index}>{`${key}: ${errors[key]}`}</li>
        ))}
      </ul>
    </Alert>
  )}
</Stack>

      </Box>
    </Container>
  );
};

export default Signup;
