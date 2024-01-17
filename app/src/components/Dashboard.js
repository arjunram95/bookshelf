import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PostForm from "./PostForm";
import axios from "axios";
import PostItem from "./PostItem";
import "./Dashboard.css";
// const API_URL =
//   process.env.REACT_APP_API_URL_POSTS || "http://localhost:5000/api/posts/";
const API_URL =
  "https://mern-book-shelf-arjunram-project.onrender.com/api/posts/";
const Dashboard = () => {
  const storedData = localStorage.getItem("user");
  const parsedData = JSON.parse(storedData);
  const { name, token } = parsedData;
  const [posts, setPosts] = useState([]);
  const { bookId } = useParams();
  const getPosts = async (bookId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token);
      const response = await axios.get(`${API_URL}?bookId=${bookId}`, config);
      const posts = response.data;
      setPosts(posts);
      console.log("posts fetched from server: ", posts);
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
  const handlePostChange = () => {
    // This function will be passed to child components
    // and called after a post is created or deleted.
    getPosts(bookId, token);
  };
  useEffect(() => {
    getPosts(bookId, token);
  }, []);
  return (
    <>
      <section>
        <h1> Welcome {name}</h1>
        <p>Dashboard</p>
      </section>
      <PostForm onPostCreated={handlePostChange} />

      <section className="content">
        {posts?.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <PostItem
                key={post._id}
                post={post}
                bookId={bookId}
                onPostDeleted={handlePostChange}
              />
            ))}
          </div>
        ) : (
          <h3> There are no comments yet</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
