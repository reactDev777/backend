const supplierProduct = (req, res, next) => {
  if (req.user && req.user.role == "ROLE_SUPPLIER") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an  Supplier");
  }
};

export default supplierProduct;
