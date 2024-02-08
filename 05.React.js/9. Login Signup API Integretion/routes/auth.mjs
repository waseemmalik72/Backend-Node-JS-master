import express from "express";
import { client } from "../mongodb.mjs";
import { stringToHash, verifyHash, validateHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";
const router = express.Router();
const db = client.db("Cruddb");
const col = db.collection("user");

router.post("/signup", async (req, res) => {
  if (
    !req.body?.firstName ||
    !req.body?.lastName ||
    !req.body?.email ||
    !req.body?.password
  ) {
    res.status(403)
      .send(`Sorry Required Parameter is Missing Type something like this {
          firstName: "Waseem",
          lastName: "Malik",
          email: "someone@email.com",
          password: "********"
      }`);
    return;
  }

  const email = req.body.email.toLowerCase();

  try {
    const result = await col.findOne({ email: email });

    if (!result) {
      const passwordHash = await stringToHash(req.body.password);

      const inputUserData = await col.insertOne({
        email: email,
        password: passwordHash,
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
      });

      console.log(inputUserData);
      res.send({ message: "you'r successfully Signup" });
      return;
    } else {
      res.status(403).send({
        message: "user already exist with this email",
      });
    }
  } catch (error) {
    res.status(500).send("server error, please try later");
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    res.status(403)
      .send(`Sorry Required Parameter is Missing Type something like this {
          email: "someone@email.com",
          password: "********"
      }`);
    return;
  }

  const email = req.body.email.toLowerCase();

  try {
    const result = await col.findOne({ email: email });
    console.log(result);

    const matchPassword = await verifyHash(req.body.password, result.password);
    console.log(result && matchPassword);

    if (result && matchPassword) {
      const token = jwt.sign(
        {
          isAdmin: false,
          email: req.body.email,
          firstName: result.firstName,
          lastName: result.lastName,
        },
        process.env.SECRET,
        {
          expiresIn: 300,
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        // expires: new Date(Date.now() + 15000)
      });
      res.send({ message: "login successfully" });
    } else {
      res.status(403).send({
        message: "Email and password Incorrect",
      });
    }
  } catch (error) {
    console.log("error getting data mongodb: ", error);
    res.status(500).send("server error, please try later");
  }
});

export default router;
