import { startHTTPServer } from "./http-server.js";
import { loadContainer } from "./src/infrastructure/container.js";

async function init() {
	try {
		const container = loadContainer();
		startHTTPServer(container);
	} catch (err) {
		console.log("Bootstrap error", err);
	}
}

init();
