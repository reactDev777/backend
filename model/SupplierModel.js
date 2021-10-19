import mongoose from "mongoose";

let supplierSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    supplierName: {
      type: String,
      required: false,
    },
    supplierLocation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
