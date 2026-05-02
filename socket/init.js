import { Server } from "socket.io";

/**
 * Attach Socket.IO to the existing HTTP server.
 * @param {import("http").Server} server
 */

export default function socketServer(server) {
	const io = new Server(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log("User connected:", socket.id);

		socket.on("send_message", (data) => {
			console.log("Received:", data);
			io.emit("receive_message", data);
		});

		socket.on("disconnect", () => {
			console.log("User disconnected:", socket.id);
		});
	});
}
