import { config } from "dotenv";
config({ path: "./.env" });
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./database/dbConnection.js";
import userRouter from "./routes/userRouter.js";

import { errorMiddleware } from "./middleware/error.js";
export const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    Credential: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
connection();

app.use(errorMiddleware);
