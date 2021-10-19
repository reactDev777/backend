import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51HudrrItb3MIcxOv7il8up8zLZDtCsiqPJbP9cYtCdrOrxeXivDLGpdI8XZDeAhSxvcEHSXYlAefW1UOE4Tu4s6600gI76WYOH"
);
import asychHandler from "express-async-handler";
import transactionModel from "../model/transactionModel.js";
import Transactions from "../model/transactionModel.js";
import Supplier from "../model/SupplierModel.js";
import Purchase from "../model/PurchaseModel.js";
import PurchaseProduct from "../model/PurchaseProduct.js";
import mongoose from "mongoose";
import e from "express";

const paymentIntegration = asychHandler(async (req, res) => {
  const { product, token } = req.body;
  console.log(product);
  stripe?.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        // description: product.car,
      });
    })
    .then((result) => {
      // This getBooking functional is update Payment
      const saveTransactionDetails = async () => {
        const trans = await Transactions.create({
          userId: product.userId,
          storeId: product.storeId,
          cartDetails: product.cart,
          totalAmount: product.totalAmount,
        });
        if (trans) {
          console.log("transaction done");
        } else {
          throw new Error("Transaction Not Saved ");
        }
      };
      //  console.log("d",result);
      saveTransactionDetails();

      res.status(200).json(result);
    })
    .catch((err) => console.log("error", err));
});

const paymentIntegrationPurchase = asychHandler(async (req, res) => {
  const { product, token } = req.body;
  console.log(product);
  stripe?.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        // description: product.car,
      });
    })
    .then((result) => {
      // This getBooking functional is update Payment
      const purchaseForStore = async () => {
        // const { userId, supplierId, cartDetails, totalAmount } = req.body;
        // console.log(cartDetails);
        const cartDetails = product.cartSup;
        const getPro = await Purchase.create({
          userId: product.userId,
          supplierId: product.supplierId,
          cartDetails: product.cartSup,
          totalAmount: product.totalAmount,
        });
        let x;
        if (getPro) {
          // console.log("df", getPro);
          cartDetails?.forEach(async (item, index) => {
            // console.log(item.id);
            const d = item?.productName;
            console.log(d);
            const f = item?.productId;

            const idx = mongoose.Types.ObjectId(f);
            console.log(idx);
            const userExist = await PurchaseProduct.findOne({ productId: idx });
            console.log("fdd", userExist);
            if (userExist) {
              res.status(400);
              console.log("Exist", userExist);
              //  if that product exist then add Qunatity to that product
              // userExist.productQuantity = userExist.productQuantit + 5;
              // const x = await userExist.save();
              // if (x) {
              //   console.log("Qunatity Added");
              // }

              return;
            }

            x = await PurchaseProduct.create({
              productId: idx,
              userId: product.userId,
              supplierId: product.supplierId,
              productName: item.productName,
              productPrice: item.productPrice,
              productQuantity: item.productQuantity,
              productImage: item.productImage,
            });
            // console.log(x);
            if (x) {
              // res.json(x);
              console.log("Added", x);
              // res.json({ message: "Product Purchases Successfully" });
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
      };
      purchaseForStore();
      res.status(200).json(result);
    })
    .catch((err) => console.log("error", err));
});

export { paymentIntegration, paymentIntegrationPurchase };
