import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoPage from './pages/LogoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RentHomePage from './pages/RentHomePage';
import RentShopPage from './pages/RentShopPage';
import AddHomePage from './pages/AddHomePage';
import AddShopPage from './pages/AddShopPage';
import AdminPage from './pages/AdminPage';
import AdminControlPage from './pages/AdminControlPage';
import HelpSupportPage from './pages/HelpSupportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rent-home" element={<RentHomePage />} />
        <Route path="/rent-shop" element={<RentShopPage />} />
        <Route path="/add-home" element={<AddHomePage />} />
        <Route path="/add-shop" element={<AddShopPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin-control" element={<AdminControlPage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
