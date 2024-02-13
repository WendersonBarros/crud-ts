import express from "express";
import db from "./config/database.config";
import todoRouter from "./route";

db.sync().then(() => {
  console.log("Connected to db");
});

const app = express();
const port = 9000;

app.use(express.json());

app.use("/api/v1", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
