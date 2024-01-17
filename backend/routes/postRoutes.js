import { Router } from "express";
import {
  getPosts,
  setPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").get(protect, getPosts).post(protect, setPost);

router.route("/:id").delete(protect, deletePost).put(protect, updatePost);

export default router;
