import express from "express";
import cors from 'cors';
import { router as usersRouter } from "./routers/users-router.js";
import { router as userContextRouter } from "./routers/user-context-router.js";
import {router as categoriesRouter} from "./routers/categories-router.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();
var corsOptions = {
  origin: 'https://backendbanditen-frontend.vercel.app',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Credentials',
};

app.use(cors(corsOptions));
app.all("/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/users", usersRouter);
app.use("/users/:userId", userContextRouter);
app.use("/", categoriesRouter);

app.listen(8097, () => {
  console.log("Server gestartet");
});
export default app;
