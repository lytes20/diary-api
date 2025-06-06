import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../model/User";
import { JWT_SECRET } from "../constants";

const SALT_ROUNDS = 10;
async function createUser(req, res: Response, next: NextFunction) {
  const { fullname, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = { fullname, username, email, password: hashedPassword };
  const response = await userModel.create(newUser);
  console.log("response", response);
  res.status(201).json({ message: "Success" });
}
async function login(req, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "FAILED", error: "Authentication failed" });
  }
  console.log("user", user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "FAILED", error: "Authentication failed" });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const userObject = user.toObject();
  delete userObject.password;
  res.status(200).json({ message: "success", user: userObject, token });
}

export default { login, createUser };
