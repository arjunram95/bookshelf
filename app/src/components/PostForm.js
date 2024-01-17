import React, { useState } from "react";
// import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostForm.css";
const API_URL =
  "https://mern-book-shelf-arjunram-project.onrender.com/api/posts";

const PostForm = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const storedData = localStorage.getItem("user");
  const parsedData = JSON.parse(storedData);
  let { email, name, token, _id } = parsedData;
  const { bookId } = useParams();
  const createPost = async (text, token) => {
    const postData = {
      bookId: bookId,
      text: text,
      user: _id,
      name: name,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, postData, config);
      console.log("post created: ", response);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(text, token);
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Add your thoughts on this book</label>
          <input
            type="text"
            name="text"
            id="text"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
