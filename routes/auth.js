import { Router } from "express";
import { auth, login, register, test } from "../controllers/authController.js";
import { uploadImage } from "../utils/multer-upload.js";

const router = Router();

router.post("/register", uploadImage.single("image"), register);
router.post("/login", login);
router.get("/auth", auth);
router.get("/test", test);
export default router;
