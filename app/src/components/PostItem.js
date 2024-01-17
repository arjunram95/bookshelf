import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./PostItem.css";
const API_URL =
  "https://mern-book-shelf-arjunram-project.onrender.com/api/posts/";

const PostItem = ({ post, onPostDeleted }) => {
  const storedData = localStorage.getItem("user");
  const parsedData = JSON.parse(storedData);
  const { email, name, token, _id } = parsedData;
  const [posts, setPosts] = useState();
  const { bookId } = useParams();
  const deletePost = async (postId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token);
      const response = await axios.delete(`${API_URL}/${postId}`, config);
      const posts = response.data;
      setPosts(posts);
      //   console.log("posts fetched from server: ", posts);
      console.log(response);

      onPostDeleted();
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
  return (
    <div className="post">
      <div>{new Date(post.createdAt).toLocaleString("en-IN")}</div>
      <h2>
        {post.name} : "{post.text}"
      </h2>
      <button onClick={() => deletePost(post._id, token)} className="close">
        X
      </button>
    </div>
  );
};

export default PostItem;
