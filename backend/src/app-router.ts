//@ts-ignore
import express from "express";
import { insertData } from "./index";

const app = express();
app.use(express.json());

app.post("/users", (request, response) => {
  insertData(request.body.username, request.body.password).then((result) => {
    response.status(200).json(result);
  });
});

app.listen(8097, () => {
  console.log("Server gestartet");
});
