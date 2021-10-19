import express from "express";
import {
  storeRegisteration,
  getAllStoreByAdmin,
  deleteStoreByAdmin,
  getStoreIdByManager,
  supplierRegisteration,
  purchaseForStore,
} from "../controller/storecontroller.js";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

router.route("/register").post(storeRegisteration);
router.route("/supplier").post(supplierRegisteration);
router.route("/get/by/admin").get(getAllStoreByAdmin);
router.route("/get/store/:id").get(getStoreIdByManager);
router.route("/delete/by/admin/:id").delete(protect, admin, deleteStoreByAdmin);

// Purchase Product

router.route("/purchase/product/").post(purchaseForStore);

export default router;
