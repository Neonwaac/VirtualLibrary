import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./BookPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TopBar from "../TopBar/TopBar";

const BookPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    fetch("http://localhost:8000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data); // Inicialmente mostrar todos los libros
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

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

  const openModal = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost:8000/rents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rents_amount: duration * selectedBook.books_price,
          rents_duration: duration,
          rents_bookid: selectedBook.books_id,
          rents_userid: userId
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Renta exitosa!',
          text: 'El libro ha sido rentado correctamente.',
          confirmButtonText: 'OK'
        });
        closeModal();
        // Filtrar los libros disponibles después de alquilar
        const updatedBooks = books.filter(book => book.books_id !== selectedBook.books_id);
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error rentando el libro. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error rentando el libro. Inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    if (category === null) {
      // Mostrar todos los libros si la categoría es "General"
      setFilteredBooks(books);
    } else {
      // Filtrar los libros por categoría
      const filtered = books.filter(book => book.books_genre === category);
      setFilteredBooks(filtered);
    }
  };

  return (
    <div>
      <TopBar
        isLoggedIn={isLoggedIn}
        username={username}
        profileImage={profileImage}
        onLogout={handleLogout}
        showRentsButton={true}
        onCategorySelect={handleCategorySelect}
      />
      <div className="container">
        <div className="books-body">
          {filteredBooks.map((book) => (
            <div key={book.books_id} className="book-container" onClick={() => openModal(book)}>
              <img
                src={`http://localhost:8000${book.books_photo}`}
                alt={book.books_title}
                className="book-image"
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Book Rent Form"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <form className="wrapper-rent" onSubmit={handleSubmit}>
          {selectedBook && (
            <>
              <img
                src={`http://localhost:8000${selectedBook.books_photo}`}
                alt={selectedBook.books_title}
                className="modal-book-image"
              />
              <h2>{selectedBook.books_title}</h2>
              <p>{selectedBook.books_description}</p>
              <label>
                Duración (días):
                <div className="input-modal">
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </label>
              <button className="alquilar-button" type="submit" disabled={loading}>
                {loading ? 'Rentando...' : 'Rentar'}
              </button>
              <button className="alquilar-button" type="button" onClick={closeModal}>Cancelar</button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default BookPage;
