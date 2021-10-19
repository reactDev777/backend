import mongoose from "mongoose";

let salesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    productName: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;
