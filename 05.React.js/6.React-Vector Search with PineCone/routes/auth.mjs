import express from "express";
import { client } from "../mongodb.mjs";

const router = express.Router();

router.post("api/v1/signup", async (req, res) => {
  res.send("signup");
});

router.post("api/v1/login", async (req, res) => {
  res.send("login");
});

export default router;
