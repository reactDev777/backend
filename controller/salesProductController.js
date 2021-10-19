import asychHandler from "express-async-handler";
import Sales from "../model/SalesModel.js";
import Product from "../model/ProductModel.js";

// AddProductByManager; By Manager Only /Shop Owner
const saleProductByManager = asychHandler(async (req, res) => {
  const {
    userId,
    storeId,
    productId,
    productName,
    productBrand,
    productCategory,
    productImage,
    productPrice,
    productQuantity,
    totalAmount,
  } = req.body;

  //   const productExist = await Sales.findOne({ productId });
  //   if (productExist) {
  //     res.status(400);
  //     throw new Error("This Product is Already Sold");
  //   }

  const sales = await Sales.create({
    userId,
    storeId,
    productId,
    productName,
    productBrand,
    productCategory,
    productImage,
    productPrice,
    productQuantity,
    totalAmount,
  });
  if (sales) {
    let quan;
    const pro = await Product.findById(productId);
    if (pro) {
      quan = pro.productQuantity;
      //   console.log("total Product Quantity", quan);
      let finalQuant;
      let newProductQuantity = quan - productQuantity;
      if (newProductQuantity === 0 || newProductQuantity < 0) {
        finalQuant = 0;
      } else {
        finalQuant = newProductQuantity;
      }
      //   console.log("total Product Quantity After Deduction", newProductQuantity);
      //   const updateShop = await shopDetails.save();
      pro.productQuantity = finalQuant;
      const updateQuant = await pro.save();
      if (updateQuant) {
        console.log("Product Quantiy is Updated", updateQuant);
      } else {
        console.log("Product Quantiy is Not Update");
      }
    }

    res.status(201).json({
      _id: sales._id,
      userId: sales.userId,
      storeId: sales.storeId,
      productId: sales.productId,
      productName: sales.productName,
      productBrand: sales.productBrand,
      productCategory: sales.productCategory,
      productImage: sales.productImage,
      productPrice: sales.productPrice,
      productQuantity: sales.productQuantity,
      totalAmount: sales.totalAmount,
    });
  } else {
    res.json({ message: "Product Not Sales" });
  }
});

export { saleProductByManager };
