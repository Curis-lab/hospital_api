import assert from "node:assert";
import test from "node:test";
import http from "http";

test("GET unknown API route should return 404", async () => {
	const options = {
		hostname: "localhost",
		port: Number(process.env.PORT || 8000),
		path: "/api/v1/not-found",
		method: "GET",
	};

	const response = await new Promise((resolve, reject) => {
		const req = http.request(options, (res) => {
			let body = "";

			res.on("data", (chunk) => (body += chunk));
			res.on("end", () => {
				resolve({
					statusCode: res.statusCode,
					body,
				});
			});
		});

		req.on("error", reject);
		req.end();
	});

	assert.strictEqual(response.statusCode, 404);
	assert.strictEqual(typeof response.body, "string");
});
