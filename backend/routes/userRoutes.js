import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

export default router;
