import mongoose from "mongoose";

let PurchaseProductModel = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SupplierProduct",
      // index: true,
      // unique: true,
      // sparse: true,
      // dropDups: true,

      // index: { unique: true },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },

    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: false,
    },
    productQuantity: {
      type: Number,
      required: false,
    },

    productImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  { _id: false }
);

// PurchaseProductModel.index({ productId: 1, unique: true });
const PurchaseProduct = mongoose.model("PurchaseProduct", PurchaseProductModel);
export default PurchaseProduct;
