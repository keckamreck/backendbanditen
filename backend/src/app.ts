//@ts-ignore
import express from "express";
import { router as userRouter } from "./routers/user-router.js";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

app.listen(8097, () => {
  console.log("Server gestartet");
});
export default app;
