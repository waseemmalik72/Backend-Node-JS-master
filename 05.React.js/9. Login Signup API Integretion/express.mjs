import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { storage } from "./Databases/firebaseConfig.mjs";
// console.log(imageRef);
const __dirname = path.resolve();
const app = express();
const port = 5000;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/post.mjs";

app.use("/api/v1", authRouter);

// Token Barrier
app.use("/api/v1", (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("your token is invalid");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      _id: decoded._id,
    };
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).send("your token is invalid");
  }
});

app.use("/api/v1", postRouter); //Secure API

app.use("/", express.static(path.join(__dirname, "web/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "web/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// Environment variable "PORT" ka value "3000" set kiya gaya hai.s
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
