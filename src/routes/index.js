import express from "express";
import bulk from "./bulk.routes.js";
import product from "./product.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "WORKS!" }).status(200);
});

router.use("/product", product);
router.use("/bulk", bulk);

export default router;
