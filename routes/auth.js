import express, { Router } from "express";
import { register, login, auth } from "../controllers/authController.js";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/auth", auth);

export default router;
