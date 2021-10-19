import mongoose from "mongoose";

let supplierProductSchema = mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    supProductName: {
      type: String,
      required: true,
    },
    supProductBrand: {
      type: String,
      required: true,
    },
    supProductCategory: {
      type: String,
      required: true,
    },
    supproductPrice: {
      type: Number,
      required: true,
    },
    supProductQuantity: {
      type: Number,
      required: true,
    },
    supProductImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SupplierProduct = mongoose.model(
  "SupplierProduct",
  supplierProductSchema
);
export default SupplierProduct;
