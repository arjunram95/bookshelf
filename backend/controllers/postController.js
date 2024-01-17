import asyncHandler from "express-async-handler";
import Post from "../models/post";
// import User from "../models/user";

//  Get posts
export const getPosts = asyncHandler(async (req, res) => {
  // const posts = await Post.find({ user: req.user.id });
  const posts = await Post.find({ bookId: req.query.bookId });
  console.log(req.query);
  res.status(200).json(posts);
});

//  Set posts

export const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const post = await Post.create({
    bookId: req.body.bookId,
    text: req.body.text,
    user: req.user.id,
    name: req.body.name,
  });

  res.status(200).json(post);
});

//  Update post
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Ensure that the logged-in user is the author of the post
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

//  DELETE post

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Ensure that the loggin user is the author of the post
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});
