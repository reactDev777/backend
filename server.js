import express from "express";
import connectDb from "./config/db.js";
import path from "path";
import userRoute from "./router/userRoute.js";
import storeRoute from "./router/storeRoute.js";
import productRoute from "./router/productRoute.js";
import saleRoute from "./router/salesRoute.js";
import uploadRoute from "./router/uploadRoute.js";
import paymentRoute from "./router/paymentRoute.js";
import { errorHandeler, notFound } from "./middleware/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());

dotenv.config();
connectDb();

app.listen(process.env.PORT, () => {
  console.log("Server is Running", process.env.PORT);
});

app.use(express.json());
// if include Static Folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// parse request data content type application/json

app.use("/api/user", userRoute);
app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);
app.use("/api/sales", saleRoute);
app.use("/api", uploadRoute);
app.use("/api/payment", paymentRoute);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Hello to Memories Api");
//   });
// }

app.use(errorHandeler);
app.use(notFound);
