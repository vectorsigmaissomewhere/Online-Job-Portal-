import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import MailIcon from '@mui/icons-material/Mail';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Unstable_Popup as BasePopup} from '@mui/base/Unstable_Popup';
import { display, styled } from '@mui/system';
import { TextField } from '@mui/material';
import axios from 'axios';
import Logout from '../auth/Logout';



const drawerWidth = 240;

function UserProfile(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [changeProfileComponent, setProfileComponent] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={() => setProfileComponent(0)}>
          <HomeIcon />
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => setProfileComponent(1)}>
          <MailIcon />
          <ListItemText primary="User Jobs" />
        </ListItemButton>
        <ListItemButton onClick={() => setProfileComponent(2)}>
          <MailIcon />
          <ListItemText primary="Saved Jobs" />
        </ListItemButton>
        <ListItemButton onClick={() => setProfileComponent(3)}>
          <Person2Icon />
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <Logout />
        </ListItemButton>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderComponent = () => {
    switch (changeProfileComponent) {
      case 0:
        return <Home />;
      case 1:
        return <UserJobs />;
      case 2:
        return <SavedJobs />;
      case 3:
        return <Profile setProfileComponent={setProfileComponent} />;
      case 4: 
        return <EditProfile />;
      default:
        return <Home />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderComponent()}
      </Box>
    </Box>
  );
}

UserProfile.propTypes = {
  window: PropTypes.func,
};

export default UserProfile;

/* Profile Components */
const Home = () => (
  <div>
    <h1>This is the Home component</h1>
  </div>
);

const UserJobs = () => (
  <div>
    <h1>This is the User Jobs component</h1>
  </div>
);

const SavedJobs = () => (
  <div>
    <h1>This is the Saved Jobs component</h1>
  </div>
);

const Profile = ({ setProfileComponent }) => (
  <Container 
    maxWidth="xl"
    sx={{
      height: '500px',
      backgroundColor: 'red',
      padding: '16px',
      borderRadius: '8px',
    }}
  >
    <Box 
      sx={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img 
        src='https://images.squarespace-cdn.com/content/656f4e4dababbd7c042c4946/1706750781148-ZC9BZUC4HG8ETZ9AEU63/how-to-stop-being-a-people-pleaser-1_1.jpg?content-type=image%2Fjpeg'
        alt='this is it'
        width='80'
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }}
      />
      <Typography sx={{ backgroundColor: 'white' }}>Nelson Mandela</Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        backgroundColor: 'green',
        padding: 2, 
      }}
    >
      <Button
        onClick={() => setProfileComponent(4)}
        variant="contained"
      >
        Edit Profile
      </Button>
    </Box>
  </Container>
);

const EditProfile = () => (
  <>
  <Container
  maxWidth="xl"
  sx={{
    height: '500px',
    backgroundColor: 'red',
    padding: '16px',
    borderRadius: '8px',
  }}
  >
    <Box
    sx={{
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <PasswordPopup />
    </Box>
  </Container>
  </>
);

const PasswordPopup = () => {
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const id = 'password-popup';
  const anchor = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password2) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    const passwordData = { password, password2 };

    axios.post('http://127.0.0.1:8000/api/user/changepassword/', passwordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(response => {
        setPassword('');
        setPassword2('');
        setMessage(response.data.msg || 'Password changed successfully!');
        setErrors({});
      })
      .catch(error => {
        console.error('Error changing password:', error);
        setMessage('Failed to change password. Please try again.');
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PasswordChangeButton aria-describedby={id} type='button' onClick={() => setOpen(!open)}>
        Reset Password
      </PasswordChangeButton>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              <Typography 
                sx={{
                  mr: '0px',
                  pt: '30px',
                  width: '80%'
                }}
              >
                Enter New Password
              </Typography>
              <TextField
                label="New Passwod"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              <Typography
                sx={{
                  mr: '0px',
                  pt: '30px',
                  width: '80%'
                }}
              >
                Re-type Password
              </Typography>
              <TextField
                label="Re-Type Passwod"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
            {message && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography color={errors ? 'error' : 'primary'}>
                  {message}
                </Typography>
              </Box>
            )}
          </form>
        </PopupBody>
      </BasePopup>
    </div>
  );
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const PasswordChangeButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);
