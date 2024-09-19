import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaUser, FaEnvelope, FaBars } from 'react-icons/fa';
import axios from 'axios';

const drawerWidth = 240;

function UserProfile({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [changeProfileComponent, setProfileComponent] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-gray-800 text-white h-full">
      <div className="p-4 border-b border-gray-700">Menu</div>
      <div className="p-4">
        <button
          className="flex items-center py-2"
          onClick={() => setProfileComponent(0)}
        >
          <FaHome className="mr-2" />
          Home
        </button>
        <button
          className="flex items-center py-2"
          onClick={() => setProfileComponent(1)}
        >
          <FaEnvelope className="mr-2" />
          User Jobs
        </button>
        <button
          className="flex items-center py-2"
          onClick={() => setProfileComponent(2)}
        >
          <FaEnvelope className="mr-2" />
          Saved Jobs
        </button>
        <button
          className="flex items-center py-2"
          onClick={() => setProfileComponent(3)}
        >
          <FaUser className="mr-2" />
          Profile
        </button>
        <button className="flex items-center py-2">
          Logout
        </button>
      </div>
    </div>
  );

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
    <div className="flex h-screen">
      <div
        className="fixed sm:hidden flex items-center bg-gray-800 text-white w-full h-12"
        style={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <button
          className="text-white p-2"
          onClick={handleDrawerToggle}
        >
          <FaBars />
        </button>
        <div className="ml-4">Responsive drawer</div>
      </div>
      <div
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } sm:block bg-gray-800 sm:bg-transparent`}
        style={{ width: drawerWidth }}
      >
        {drawer}
      </div>
      <main className="flex-1 p-6">
        {renderComponent()}
      </main>
    </div>
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
  <div className="max-w-4xl h-96 bg-red-500 p-4 rounded-lg">
    <div className="bg-black flex flex-col items-center justify-center">
      <img
        src="https://images.squarespace-cdn.com/content/656f4e4dababbd7c042c4946/1706750781148-ZC9BZUC4HG8ETZ9AEU63/how-to-stop-being-a-people-pleaser-1_1.jpg?content-type=image%2Fjpeg"
        alt="profile"
        className="w-20 rounded-full border-2 border-white"
      />
      <p className="bg-white text-black mt-2">Nelson Mandela</p>
    </div>
    <div className="flex justify-end bg-green-500 p-4">
      <button
        onClick={() => setProfileComponent(4)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit Profile
      </button>
    </div>
    <div>
      <UserDetails />
    </div>
  </div>
);

const EditProfile = () => (
  <div className="max-w-4xl h-96 bg-red-500 p-4 rounded-lg">
    <div className="bg-black flex flex-col items-center justify-center">
      <PasswordPopup />
    </div>
  </div>
);

const PasswordPopup = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password2) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    const passwordData = { password, password2 };

    axios
      .post(
        'http://127.0.0.1:8000/api/user/changepassword/',
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        setPassword('');
        setPassword2('');
        setMessage(response.data.msg || 'Password changed successfully!');
        setErrors({});
      })
      .catch((error) => {
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
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        Reset Password
      </button>
      {open && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <label className="flex items-center">
                <span className="mr-4">Enter New Password</span>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="flex items-center">
                <span className="mr-4">Re-type Password</span>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </label>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`${
                    loading ? 'bg-gray-400' : 'bg-blue-500'
                  } text-white px-4 py-2 rounded`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
            {message && (
              <div className="mt-4 text-center text-red-500">{message}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

const UserDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/profileDescription/');
        setProfileData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This page provides details about the user's profile and related models.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {profileData && (
            <>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.description}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.phonenumber}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.email}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.bio}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.address}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileData.profile_picture ? (
                    <img src={profileData.profile_picture} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                  ) : (
                    'No profile picture available'
                  )}
                </dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
};
