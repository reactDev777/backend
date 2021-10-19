const manger = (req, res, next) => {
  if (req.user && req.user.role == "ROLE_MANAGER") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an manger");
  }
};

export default manger;
