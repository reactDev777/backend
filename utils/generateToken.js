import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "login", {
    expiresIn: "30d",
  });
};

export default generateToken;
