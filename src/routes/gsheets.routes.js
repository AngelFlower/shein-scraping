import express from "express";
import {
  getPrincipalImage,
  getImages,
} from "../controllers/product/googleSheets.js";

const router = express.Router();

router.get("/first-img/", getPrincipalImage);
router.get("/imgs/", getImages);

export default router;
