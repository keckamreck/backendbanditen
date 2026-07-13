import express from "express";

import { router as usersRouter } from "./routers/users-router.js";
import { router as userContextRouter } from "./routers/user-context-router.js";
import {router as categoriesRouter} from "./routers/categories-router.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/users/:userId", userContextRouter);
app.use("/", categoriesRouter);

app.listen(8097, () => {
  console.log("Server gestartet");
});
export default app;
