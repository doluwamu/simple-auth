import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, ACC_JWT_EXP, REF_JWT_EXP } = process.env;

export const generateAccessToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: ACC_JWT_EXP },
  );
};

export const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: REF_JWT_EXP },
  );
};
