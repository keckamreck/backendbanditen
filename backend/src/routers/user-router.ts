import express from "express";
import * as users from "../repositories/users.js";
import { User } from "../repositories/users.js";
export const router = express.Router();

router.post("/", (request, response) => {
  const data: User = {
    id: "",
    username: request.body.username,
    email: request.body.email,
  };

  users.createData(data).then((result: any) => {
    response.status(200);
  });
});

router.get("/:id", (request, response) => {
  const data = request.params.id;

  users.readData(data).then((result: any) => {
    response.status(200).json(result);
  });
});

router.patch("/:id", (request, response) => {
  const data: User = {
    id: request.params.id,
    username: request.body.username,
    email: request.body.email,
  };

  users.updateData(data).then((result: any) => {
    response.status(200);
  });
});

router.delete("/:id", (request, response) => {
  const data = request.params.id;

  users.deleteData(data).then((result: any) => {
    response.status(200);
  });
});
