import express from "express";
import { client } from "../mongodb.mjs";

const router = express.Router();

router.get("api/v1/signup", async (req, res) => {
  res.send("signup");
});

router.get("api/v1/login", async (req, res) => {
  res.send("login");
});

export default router;
