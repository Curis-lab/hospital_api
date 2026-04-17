import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

import BaseRouter from "./routes/index.js";

import redis from "redis";
import createScopeContainerMiddleware from "./src/infrastructure/web/middlewares/create-scope-container.middleware.js";

dotenv.config();



export const redisClient = redis.createClient({
  password: `${process.env.REDIS_PASSWORD}`,
  socket: {
    host: `${process.env.REDIS_SOCKET_HOST}`,
    port: 12674,
  },
});

// redisClient.connect(console.log("Redis is connected")).catch(console.err);

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb database is connected.");
  } catch (err) {
    console.log("Mongodb database is connection field.", err);
  }
};

export function startHTTPServer(container) {
  const app = express();
  const port = process.env.PORT || 8000;

  const corsOptions = {
    origin: ["http://localhost:5173", "https://medibook-jade.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "authentication"],
    credentials: true,
  };

  // app.use(morgan("dev"));

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(createScopeContainerMiddleware(container));

  app.use("/api/v1", BaseRouter);

  app.use((err, req, res, next) => {
    req;
    next;
    return res.status(500).json({
      error: err.message,
    });
  });
  app.listen(port, () => {
    connectDB();
    console.log(`Server is lived on port ${port}`);
  });
}
