import asychHandler from "express-async-handler";
import User from "../model/userModel.js";
import Store from "../model/StoreModel.js";
import Supplier from "../model/SupplierModel.js";
import Purchase from "../model/PurchaseModel.js";
import PurchaseProduct from "../model/PurchaseProduct.js";
import mongoose from "mongoose";
// storeRegisteration; By Admin Only
const storeRegisteration = asychHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    storeName,
    storeLocation,
    storeLatitude,
    storeLongitude,
  } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (user) {
    if (role === "ROLE_MANAGER") {
      const store = await Store.create({
        userId: user._id,
        storeName,
        storeLocation,
        storeLatitude,
        storeLongitude,
      });

      if (store) {
        res.status(201).json({
          _id: store._id,
          storeName: store.storeName,
          storeLocation: store.storeLocation,
          storeLatitude: store.storeLatitude,
          storeLongitude: store.storeLongitude,
        });
      } else {
        res.json({ message: "Store Not Updated" });
      }
    }
  } else {
    // throw new Error("User Not Created ");
    res.json({ message: "Store Not Created" });
  }
});

const getAllStoreByAdmin = asychHandler(async (req, res) => {
  const getPro = await Store.find({});

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const deleteStoreByAdmin = asychHandler(async (req, res) => {
  console.log(req.params.id);
  const getPro = await Store.findByIdAndRemove(req.params.id);

  if (getPro) {
    res.json({ message: "Product is Deleted  ", getPro });
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const getStoreIdByManager = asychHandler(async (req, res) => {
  const getPro = await Store.findOne({ userId: req.params.id });

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

// storeRegisteration; By Admin Only
const supplierRegisteration = asychHandler(async (req, res) => {
  const { name, email, password, role, supplierName, supplierLocation } =
    req.body;

  console.log(name, email);

  const userExist = await User.findOne({
    $or: [{ email: email }, { name: name }],
  });

  console.log(userExist);

  if (userExist) {
    res.status(400);
    throw new Error("Supplier or Email Already Exists Please Add Unique Name");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (user) {
    if (role === "ROLE_SUPPLIER") {
      const suppl = await Supplier.create({
        userId: user._id,
        supplierName,
        supplierLocation,
      });

      if (suppl) {
        res.status(201).json({ message: "Supplier Added" });
      } else {
        res.json({ message: "Supplier Not Updated" });
      }
    }
  } else {
    // throw new Error("User Not Created ");
    res.json({ message: "Supplier Not Created" });
  }
});

// Post Purchase Cart

const purchaseForStore = asychHandler(async (req, res, next) => {
  const { userId, supplierId, cartDetails, totalAmount } = req.body;
  console.log(cartDetails);
  const getPro = await Purchase.create({
    userId,
    supplierId,
    cartDetails,
    totalAmount,
  });
  let x;
  if (getPro) {
    // const getData = async () => {
    //   const g = await Purchase.find({});
    //   if (g) {
    //     console.log("eresr", g);
    //   } else {
    //     console.log("error", g);
    //   }
    // };
    // getData();
    cartDetails?.forEach(async (item, index) => {
      // console.log(item.id);
      const d = item?.productName;
      console.log(d);
      const f = item?.productId;

      const idx = mongoose.Types.ObjectId(f);
      // console.log(idx);
      //  const check = await PurchaseProduct.findOne({ d });
      //  console.log(check);
      const userExist = await PurchaseProduct.findOne({ productId: idx });
      console.log(userExist);
      if (userExist) {
        res.status(400);
        console.log("Exist", userExist);
        return;
      }

      x = await PurchaseProduct.create({
        productId: idx,
        userId,
        supplierId,
        productName: item.productName,
        productPrice: item.productPrice,
        productQuantity: item.productQuantity,
        productImage: item.productImage,
      });
      // console.log(x);
      if (x) {
        // res.json(x);
        console.log("Added", x);
        res.json({ message: "Product Purchases Successfully" });
      } else {
        console.log("failed");
        res.status(404);
        // res.json(x);
      }
    });

    // res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

export {
  storeRegisteration,
  getAllStoreByAdmin,
  deleteStoreByAdmin,
  getStoreIdByManager,
  supplierRegisteration,
  purchaseForStore,
};
