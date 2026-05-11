import { Router } from "express";
import { test } from "../controllers/auth-controller.js";
import multerMiddleware from "../middlewares/multer-upload.js";
import Controller from "./controller.js";

export default class AuthRoute extends Controller {
	constructor() {
		super();
		this.get("/test", test);
	}
}
