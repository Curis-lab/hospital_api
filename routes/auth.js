import { Router } from "express";
import multer from "multer";
import { auth, login, register, test } from "../controllers/authController.js";

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
router.get('/test', test);
export default router;
