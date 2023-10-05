import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
const __dirname = path.resolve();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
import authRouter from "./routes/auth.mjs";
import postRouter from "./routes/post.mjs";

app.use("/api/v1", authRouter);

app.use("/api/v1", postRouter);
// app.use(express.static(path.join(__dirname, "web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// Environment variable "PORT" ka value "3000" set kiya gaya hai.
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
