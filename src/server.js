import express from "express";
import { config } from "./config.js";
import routes from "./routes/index.js";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
