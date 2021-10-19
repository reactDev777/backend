import mongoose from "mongoose";

let PurchaseModel = mongoose.Schema(
  {
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

    isPaid: {
      type: Boolean,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalProfit: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model("Purchase", PurchaseModel);
export default Purchase;
