import express from "express";
import {
  paymentIntegration,
  paymentIntegrationPurchase,
} from "../controller/paymentController.js";

const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import manger from "../middleware/managerMiddleware.js";

router.route("/make").post(paymentIntegration);

router.route("/purchase").post(paymentIntegrationPurchase);

export default router;
