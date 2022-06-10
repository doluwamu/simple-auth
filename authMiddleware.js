import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userQuery from "./queries/userQueries.js";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await new userQuery().userExistsById(decoded.id);
      req.user = user[0][0];

      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  if (!token) {
    return res.status(401).send({ message: "Not authorized, no token" });
  }
};
