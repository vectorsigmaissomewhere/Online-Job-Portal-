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
        return <Profile />;
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

const Profile = () => (
  <>
  <h1>This is our profile section</h1>
  </>
);
