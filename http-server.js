import http from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import session from "express-session";
import passport from "passport";
import { Server } from "socket.io";

import notificationServer from "./notification/index.js";
import router from "./routes/index.js";

dotenv.config();

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb database is connected.");
  } catch (err) {
    console.log("Mongodb database connection failed.", err);
  }
};

export async function startHTTPServer(container) {
  const app = express();
  const port = process.env.PORT || 8000;

  // create http server
  const server = http.createServer(app);

  // attach socket.io
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // this is final 
  
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log("User connected:", socket.id);

    socket.on("send-notification", (data) => {
      console.log("data", data);
      io.emit("receive-notification", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  app.use(express.json());

  app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "authentication"],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use("/api/v1", router);

  app.use((err, req, res, next) => {
    return res.status(500).json({
      error: err.message,
    });
  });

  try {
    await connectDB();

    // IMPORTANT
    server.listen(port, () => {
      console.log(`Server is live on port ${port} 🟢`);
    });
  } catch (err) {
    console.log("Server startup failed:", err);
  }
}
