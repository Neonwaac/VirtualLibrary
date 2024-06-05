import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import './TopBar.css';

const TopBar = ({ isLoggedIn, username, profileImage, onLogout, showRentsButton, onCategorySelect }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
  };

  return (
    <div className="top-bar">
      <div className="login">
        {isLoggedIn ? (
          <div className="user-menu">
            <div className="user-info" onClick={toggleProfileMenu}>
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              )}
              <p>{username.toUpperCase()}</p>
              <FaChevronDown className="chevron-icon" />
            </div>
            {profileMenuOpen && (
              <div className="dropdown-menu left">
                <button className="ver-rentas" onClick={onLogout}>
                  Cerrar Sesión
                </button>
                {showRentsButton && (
                  <Link to="/rents">
                    <button className="ver-rentas">Ver Rentas</button>
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>
            <Link to="/login">Iniciar Sesión</Link>
          </p>
        )}
      </div>
      <div className="categories">
        <button className="category-button" onClick={toggleCategoryMenu}>
          Categorías <FaChevronDown className="chevron-icon" />
        </button>
        {categoryMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={() => onCategorySelect(null)}>General</button>
            <button onClick={() => onCategorySelect('Ficción')}>Ficción</button>
            <button onClick={() => onCategorySelect('Romance')}>Romance</button>
            <button onClick={() => onCategorySelect('Ciencia')}>Ciencia</button>
            <button onClick={() => onCategorySelect('Historia')}>Historia</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
