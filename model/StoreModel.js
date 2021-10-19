import mongoose from "mongoose";

let storeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    storeName: {
      type: String,
      required: true,
    },
    storeLocation: {
      type: String,
      required: true,
    },
    storeLatitude: {
      type: Number,
      required: true,
    },
    storeLongitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
