import React, { useEffect, useState } from "react";
import "./RentPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TopBar from "../TopBar/TopBar";

const RentPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [rents, setRents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (token && storedUsername && storedUserId && storedProfileImage) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
      setProfileImage(storedProfileImage);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // Asegúrate de que userId no es null antes de hacer la solicitud

    const fetchRents = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rents?userId=${userId}`);
        const data = await response.json();
        setRents(data);
      } catch (error) {
        console.error("Error fetching rents:", error);
      }
    };
    fetchRents();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileImage");
    setIsLoggedIn(false);
    setUsername("");
    setUserId(null);
    setProfileImage("");
    navigate("/login");
  };

  const handleReturn = async (rentId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/rents/${rentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Devolución exitosa!',
          text: 'El libro ha sido devuelto correctamente.',
          confirmButtonText: 'OK'
        });
        setRents(rents.filter(rent => rent.rents_id !== rentId));
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error devolviendo el libro. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error devolviendo el libro. Inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleBackToBooks = () => {
    navigate('/books');
  };

  return (
    <div>
      <TopBar
        isLoggedIn={isLoggedIn}
        username={username}
        profileImage={profileImage}
        onLogout={handleLogout}
        showRentsButton={false}
      />
      <div className="container-rents">
        <div className="titulo">
          <p>Mis Rentas</p>
        </div>
        <div className="books-body">
          {rents.map((rent) => (
            <div key={rent.rents_id} className="rent-container">
              <img
                src={`http://localhost:8000${rent.book.books_photo}`}
                alt={rent.book.books_title}
                className="book-image"
              />
              <p className="books_title">{rent.book.books_title}</p>
              <button className="regresar-button" onClick={() => handleReturn(rent.rents_id)}>
                Devolver
              </button>
            </div>
          ))}
        </div>
        <button className="regresar-button" onClick={handleBackToBooks}>Regresar a Libros</button>
      </div>
    </div>
  );
};

export default RentPage;