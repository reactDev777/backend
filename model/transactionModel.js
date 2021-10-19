import mongoose from "mongoose";

let transactionModel = mongoose.Schema(
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
    cartDetails: [],
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

const Transactions = mongoose.model("Transaction", transactionModel);
export default Transactions;
