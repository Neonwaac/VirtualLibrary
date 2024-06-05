import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RentPage from './components/RentPage/RentPage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import BookPage from './components/BookPage/BookPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rents" element={<RentPage />} />
          <Route path="/books" element={<BookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

