import React, { useState } from "react";
import "../App";
import SearchBar from "./SearchBar";
import axios from "axios";
import BookList from "./BookList";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchField, setSearchField] = useState("");
  const storedData = localStorage.getItem("user");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const { name } = parsedData;
  }
  const searchBook = async (e) => {
    e.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchField}`)
      .then((res) => setBooks([...res.data.items]))
      .catch((error) => console.log(error));
    console.log(books);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  return (
    <div className="books-display">
      {/* {name ? <h3>Welcome {name} !!</h3> : null} */}
      <SearchBar searchBook={searchBook} handleSearch={handleSearch} />
      <BookList books={books} />
    </div>
  );
};

export default Books;
