import express from "express";
import { saleProductByManager } from "../controller/salesProductController.js";
const router = express.Router();

router.route("/add").post(saleProductByManager);

export default router;
