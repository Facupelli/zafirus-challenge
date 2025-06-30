import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign(payload, secret, options);
};
