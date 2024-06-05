import React from 'react';
import booksImage from '../assets/books.png';
import { Link } from "react-router-dom";
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-image-container">
        <img className="main-page-image" src={booksImage} alt="Books" />
      </div>
      <div className="main-page-right-side">
        <p>Tu Biblioteca Favorita<br/>¡Ingresa Ahora!</p>
        <div className="main-page-buttons">
          <Link to="/login"><button className="main-page-button">Inicia Sesión</button></Link>
          <Link to="/register"><button className="main-page-button">Registrate</button></Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
