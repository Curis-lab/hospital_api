import { startHTTPServer } from "./http-server.js";

async function init() {
	try {
		startHTTPServer();
	} catch (err) {
		console.log("Bootstrap error 🟢", err);
	}
}

init();
