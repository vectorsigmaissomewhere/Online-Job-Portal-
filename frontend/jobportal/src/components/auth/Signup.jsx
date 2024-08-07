import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Checkbox, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Signup = () => {
  const [email,setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [tc,setTc] = useState(false);

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
      <form
      >
      <Typography
      variant='h5'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '30px',
      }}
      ><b>Signup</b>
      </Typography>
      <Box>
        <Typography>
          Email
        </Typography>
        <TextField 
        sx={{
          mb: '10px'
        }}
        size='small'
        label="Email" value={email} variant="outlined" margin="normal" onChange={(e) => setEmail(e.target.value)} />
      </Box>
      <Box>
        <Typography>
          Full Name
        </Typography>
        <TextField 
        sx={{
          mb: '10px'
        }}
        size='small'
        label="Full Name" value={name} variant="outlined" margin="normal" onChange={(e) => setName(e.target.value)} />
      </Box>
      <Box>
        <Typography>
          Password
        </Typography>
        <TextField 
        size="small"
        sx={{
          mb: '10px'
        }}
        label="Password" value={password} variant="outlined" margin="normal" type="password" onChange={(e) => setPassword(e.target.value)}/>
      </Box>
      <Box>
        <Typography>
          Confirm Password
        </Typography>
        <TextField 
        size="small"
        sx={{
          mb: '10px'
        }}
        label="Confirm Password" value={conPassword} variant="outlined" margin="normal" type="password" onChange={(e) => setConPassword(e.target.value)}/>
      </Box>
      <FormGroup>
        <FormControlLabel control={ <Checkbox defaultChecked/>} label="Accept Terms and Conditions" required value={tc} onChange={(e) => setTc(e.target.value)}/>
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
      >
      Submit</Button>
      </Box>

      <Typography 
      sx={{
        fontSize: '12px',
        mt: '20px'
      }}
      >Don't have an account? Sign up</Typography>
      </form>
      </Box>
      {/*if you want to add something at the side you can give a reference */}
    </Container>
  );
};

export default Signup;
