import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/post.mjs";

const __dirname = path.resolve();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", authRouter);
app.use("/api/v1", postRouter);

app.use(express.static(path.join(__dirname, "web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// Environment variable "PORT" ka value "3000" set kiya gaya hai.
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Api 2nd key
// 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
