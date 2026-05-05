import { Router } from "express";
import { auth, login, register, test } from "../controllers/auth-controller.js";
import multerMiddleware from "../middlewares/multer-upload.js";
import Controller from "./controller.js";

export default class AuthRoute extends Controller {
	constructor() {
		super();
		this.post("/register", register, multerMiddleware.imageUpload());
		this.post("/login", login);
		this.get("/auth", auth);
		this.get("/test", test);
	}
}
