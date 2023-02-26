import express from "express";
import scraping from "./scraping.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "WORKS!" }).status(200);
});

router.use("/scraping", scraping);

export default router;
