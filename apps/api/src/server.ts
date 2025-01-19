import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./Routers/authRouter";
import userRouter from "@/src/Routers/userRouter";
import cookieParser from "cookie-parser";
import passport from "passport";
import '@/src/configs/passportConfig';
import groupRouter from "@/src/Routers/groupRouter";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(passport.initialize())
    .use(urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(cors({ credentials: true }))
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    })
    .use("/api/auth", authRouter)
    .use("/api/users", userRouter)
    .use("/api/groups", groupRouter);

  return app;
};
