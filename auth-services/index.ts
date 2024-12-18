import express from "express";
import cors from "cors";
import session from "express-session";
import router from "./src/routes";
import { createClient } from "redis";
import { configDotenv } from "dotenv";
import { createDb } from "./src/db/createDb";
import { AuthLoginCreatedListener } from "./src/event/listener/auth-login-created";
import { rabbit } from "./src/event/rabbitmqWrapper";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import { currentUser } from "./src/middleware/currentUser";

const app = express();

configDotenv();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const redisClient = createClient({ url: Bun.env.REDIS_URI });
const redisStore = new RedisStore({ client: redisClient });
redisClient.connect().catch((e) => console.log("Error Not Connected Redis"));

app.use(
  session({
    store: redisStore,
    secret: Bun.env.JWT_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      signed: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(
  cors({
    origin: "https://tickets.dev",
    credentials: true,
  })
);
// @ts-ignore
app.use("/api", currentUser, router);

app.listen(3000, async () => {
  if (!process.env.JWT_KEY) console.log("JWT_KEY is not defined");
  if (!process.env.MONGO_URI) console.log("MONGO_URI is not defined");
  if (!process.env.RABBITMQ_URI) console.log("RABBITMQ_URI is not defined");

  createDb();

  await rabbit.connect(process.env.RABBITMQ_URI!);

  await new AuthLoginCreatedListener(rabbit?.client!).listen();

  console.log("Server is running on port 3000");
});
