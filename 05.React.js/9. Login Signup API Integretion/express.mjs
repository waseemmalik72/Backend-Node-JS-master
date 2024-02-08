import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.use((req, res, next) => {
  // Barrier
  // console.log(req.cookies);
  const token = req.cookies.token;
  if (token) {
    req.user = token;
    console.log(req.user);
    next();
    return;
  }
  res.status(401).send("your token is unvalid");
});

app.use("/api/v1", postRouter); //Secure API

app.get("/api/v1/ping", (req, res) => {
  res.send("OK");
});

app.use(express.static(path.join(__dirname, "web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// Environment variable "PORT" ka value "3000" set kiya gaya hai.
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
