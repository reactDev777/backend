import express from "express";
import {
  AddProductByManager,
  AddProductBySupplier,
  getProductByManager,
  searchProductByManager,
  deleteProduct,
  productUpdate,
  getSingleProduct,
  getSupplier,
  getAllProductSupplier,
  getAllSupplier,
  getAllSupplierById,
} from "../controller/productController.js";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import manger from "../middleware/managerMiddleware.js";
import supplier from "../middleware/supplierMiddleware.js";

router.route("/add").post(protect, manger, AddProductByManager);

// Get All Supplier
router.route("/all/supplier").get(protect, manger, getAllSupplier);

// Get Supplier By Id
router.route("/all/supplier/:id").get(protect, manger, getAllSupplierById);

// Supplier
router.route("/by/supplier").post(protect, supplier, AddProductBySupplier);
router.route("/supplier/:id").get(protect, supplier, getSupplier);
router
  .route("/supplier/product/:id")
  .get(protect, manger, getAllProductSupplier);

// Supplier
router.route("/by/manager/:id").get(getProductByManager);
router.route("/search/").get(protect, manger, searchProductByManager);
router.route("/:id").delete(protect, manger, deleteProduct);
router.route("/update/:id").put(protect, manger, productUpdate);
router.route("/single/:id").get(protect, manger, getSingleProduct);

export default router;
