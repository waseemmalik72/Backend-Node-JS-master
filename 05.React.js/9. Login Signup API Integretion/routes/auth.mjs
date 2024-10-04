import express from "express";
import { client } from "../Databases/mongodb.mjs";
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
          firstName: "John",
          lastName: "Doe",
          email: "someone@email.com",
          password: "********"
      }`);
    return;
  }

  const email = req.body.email.toLowerCase();

  try {
    const result = await col.findOne({ email: email });
    console.log(result);
    if (!result) {
      const passwordHash = await stringToHash(req.body.password);

      const inputUserData = await col.insertOne({
        isAdmin: false,
        email: email,
        password: passwordHash,
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
      });

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

    if (!result) {
      res.status(403).send({
        message: "Email doesn't exist",
      });
      return;
    }

    const matchPassword = await verifyHash(req.body.password, result?.password);

    if (matchPassword) {
      const token = jwt.sign(
        {
          isAdmin: result.isAdmin,
          email: req.body.email,
          firstName: result.firstName,
          lastName: result.lastName,
          _id: result._id,
        },
        process.env.SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        // expires: new Date(Date.now() + 15000)
      });
      res.send({
        message: "login successfully",
        user: {
          isAdmin: result.isAdmin,
          email: req.body.email,
          firstName: result.firstName,
          lastName: result.lastName,
          _id: result._id,
        },
      });
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

router.post("/logout", (req, res) => {
  console.log("hello world");
  res.clearCookie("token");
  res.send({ message: "logout successfully" });
});
export default router;
