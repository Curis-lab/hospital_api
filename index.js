import { startHTTPServer } from "./http-server.js";

async function init() {
	try {
		startHTTPServer(container);
	} catch (err) {
		console.log("Bootstrap error", err);
	}
}

init();
