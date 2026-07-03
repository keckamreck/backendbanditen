//@ts-ignore
import express from "express";
//@ts-ignore
import { insertData } from "./index.js";

const app = express();
app.use(express.json());

app.post("/users", (request, response) => {
  insertData(
    request.body.username,
    request.body.password,
    request.body.email,
  ).then((result: any) => {
    response.status(200).json(result);
  });
});

app.listen(8097, () => {
  console.log("Server gestartet");
});
