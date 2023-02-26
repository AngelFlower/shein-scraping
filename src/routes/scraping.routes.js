import express from "express";
import { getScraping } from "../controllers/scraping/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Scraping Route" }).status(200);
});
router.post("/", getScraping);

export default router;
