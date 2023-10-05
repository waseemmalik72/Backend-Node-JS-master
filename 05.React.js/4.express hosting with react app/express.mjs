import express from "express";
import path from "path";
import cors from "cors";
const app = express();
const __dirname = path.resolve();
const port = 3001;
app.use(cors());

app.use(express.static(path.join(__dirname, "/web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
