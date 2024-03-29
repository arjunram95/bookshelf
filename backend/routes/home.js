import { Router } from "express";
import { join } from "path";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../", "build", "index.html"));
});

export default router;
