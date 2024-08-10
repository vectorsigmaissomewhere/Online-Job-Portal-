import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './index.css'
import Header from './components/common/Header';
import UserProfile from './components/profile/UserProfile';
import Logout from './components/auth/Logout';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='logout' element={<Logout />} />
      </Routes>
    </Router>
  )
}

export default App
