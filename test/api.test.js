import test from "node:test";
import assert from "node:assert";
import http from "http";

test("POST /api/doctors should return 201", async () => {
  const data = JSON.stringify({
    name: "John",
    email: "john@test.com",
  });

  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/api/doctors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const response = await new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(body),
        });
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });

  // ✅ Assertions
  assert.strictEqual(response.statusCode, 201);
  assert.strictEqual(response.body.success, true);
});