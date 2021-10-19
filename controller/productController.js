import asychHandler from "express-async-handler";

import Product from "../model/ProductModel.js";
import SupplierProduct from "../model/SupplierProductModel.js";
import PurchaseProduct from "../model/PurchaseProduct.js";
import Supplier from "../model/SupplierModel.js";
// AddProductByManager; By Manager Only /Shop Owner
const AddProductByManager = asychHandler(async (req, res) => {
  console.log("test");
  const {
    userId,
    storeId,
    productName,
    productBrand,
    productCategory,
    productImage,
    productPrice,
    productQuantity,
  } = req.body;

  const productExist = await Product.findOne({ productName });
  if (productExist) {
    res.status(400);
    throw new Error("Product Already Exist");
  }

  const product = await Product.create({
    userId,
    storeId,
    productName,
    productBrand,
    productCategory,
    productImage,
    productPrice,
    productQuantity,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      userId: product.userId,
      storeId: product.storeId,
      productName: product.productName,
      productBrand: product.productBrand,
      productCategory: product.productCategory,
      productImage: product.productImage,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
    });
  } else {
    res.json({ message: "Product Not Added" });
  }
});

const getProductByManager = asychHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const getPro = await PurchaseProduct.find({ userId: id });
  console.log(getPro);
  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

// Search Product  through Product Name ,brand ,category

const searchProductByManager = asychHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  console.log(keyword);

  const searchdata = await Product.find({
    $and: [
      { userId: req.user.id },
      {
        $or: [
          { productName: keyword.name },
          { productBrand: keyword.name },
          { productCategory: keyword.name },
        ],
      },
    ],
  });

  // const getdataBetween = await Product.find({
  // $and: [
  //   { userId: req.user.id },
  //   {
  //     $or: [
  //       { productName: { ...keyword } },
  //       { productBrand: { ...keyword } },
  //       { productCategory: { ...keyword } },
  //     ],
  //   },
  //   // { productName: req.params.name }],
  // ],
  // });

  if (searchdata) {
    res.json(searchdata);
  } else {
    res.status(404).json({ message: "Product is Not Find" });
  }
});

const deleteProduct = asychHandler(async (req, res) => {
  console.log(req.params.id);
  const getPro = await Product.findByIdAndRemove(req.params.id);

  if (getPro) {
    res.json({ message: "Product is Deleted  ", getPro });
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const productUpdate = asychHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // console.log('user Controller ', user)
  if (product) {
    product.productName = req.body.productName || product.productName;
    product.productBrand = req.body.productBrand || product.productBrand;
    product.productPrice = req.body.productPrice || product.productPrice;
    product.productQuantity =
      req.body.productQuantity || product.productQuantity;
    product.productImage = req.body.productImage || product.productImage;
    product.productCategory =
      req.body.productCategory || product.productCategory;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.json({
        message: "Product Update Successfully",
      });
    }
  } else {
    res.status(404).json({ message: "Product not Updated" });
  }
});

const getSingleProduct = asychHandler(async (req, res) => {
  // console.log(req.user);
  const id = req.params.id;

  const getPro = await Product.findById(id);

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found with this Id :", id });
  }
});

// AddProductBySupplier

const AddProductBySupplier = asychHandler(async (req, res) => {
  console.log("test");
  const {
    supplierId,
    userId,
    supProductName,
    supProductBrand,
    supProductCategory,
    supproductPrice,
    supProductQuantity,
    supProductImage,
  } = req.body;

  console.log(
    supplierId,
    supProductName,
    supProductBrand,
    supProductCategory,
    supproductPrice,
    supProductQuantity,
    supProductImage
  );

  const productExist = await SupplierProduct.findOne({ supProductName });
  console.log(productExist);
  if (productExist) {
    res.status(400);
    throw new Error("Product Alreadys Exist");
  }

  const product = await SupplierProduct.create({
    supplierId,
    userId,
    supProductName,
    supProductBrand,
    supProductCategory,
    supproductPrice,
    supProductQuantity,
    supProductImage,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      supsupplierId: product.supplierId,
      supsupplierId: product.userId,
      supproductName: product.supproductName,
      supproductBrand: product.supproductBrand,
      supproductCategory: product.supproductCategory,
      supproductImage: product.supproductImage,
      supproductPrice: product.supproductPrice,
      supproductQuantity: product.supproductQuantity,
    });
  } else {
    res.json({ message: "Product Not Added" });
  }
});

// Get Logged in Supplier Id of User
const getSupplier = asychHandler(async (req, res) => {
  // console.log(req.user);
  const id = req.params.id;

  const getPro = await Supplier.findOne({ userId: id });

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found with this Id :", id });
  }
});

const getAllProductSupplier = asychHandler(async (req, res) => {
  // console.log(req.user);
  const id = req.params.id;

  const getPro = await SupplierProduct.find({ userId: id });

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found with this Id :", id });
  }
});

// Get All Supplier
const getAllSupplier = asychHandler(async (req, res) => {
  // console.log(req.user);
  const id = req.params.id;

  const getPro = await Supplier.find({});

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found with this Id :", id });
  }
});

//   Get Supplier  By Id

const getAllSupplierById = asychHandler(async (req, res) => {
  // console.log(req.user);
  const id = req.params.id;

  const getPro = await Supplier.findById(id);

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Found with this Id :", id });
  }
});

export {
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
};
