import { Router } from "express";

export default class Controller {
	router;

	constructor() {
		this.router = Router();
	}

	route(options) {
		if (options.middleware) {
			this.router[options.method](
				options.path,
				options.middleware,
				options.handler,
			);
		} else {
			this.router[options.method](options.path, options.handler);
		}
	}

	get(path, handler) {
		this.route({
			method: "get",
			path,
			handler,
		});
	}
	post(path, handler, middleware) {
		this.route({
			method: "post",
			path,
			middleware,
			handler,
		});
	}
	use(path, handler) {
		this.route({
			method: "use",
			path,
			handler,
		});
	}
	put(path, handler, middleware) {
		this.route({
			method: "put",
			path,
			middleware,
			handler,
		});
	}
	patch(path, handler, middleware) {
		this.route({
			method: "patch",
			path,
			middleware,
			handler,
		});
	}
	delete(path, handler, middleware) {
		this.route({
			method: "delete",
			path,
			middleware,
			handler,
		});
	}
	fileUpload() {
		//imagekit
	}

	get routes() {
		return this.router;
	}
}
