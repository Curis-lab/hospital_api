import fs from "fs";
import { Server } from "socket.io";

const events = {
	"appoint:remainder": (data) => {},
	"appointment:remainder": (data) => {},
};

export default function notificationServer(server) {
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

		socket.on("send:noti", (data) => {
			const message = JSON.parse(data);
			if (message.type === "notification") {
				socket.send("recv:notif", {
					type: "",
					message: "",
				});
			} else {
				socket.send("recv:notif", {
					type: "",
					message: "",
				});
			}
			const filename = fs.readFile("./readme.md");
			socket.emit("recv:notif", {});
		});
	}).on("end", () => console.log("socket has shutted down."));
}
