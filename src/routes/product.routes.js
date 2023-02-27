import express from "express";
import { getOne } from "../controllers/product/index.js";

const router = express.Router();

router.get("/", getOne);

export default router;
