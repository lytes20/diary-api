import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../model/User";
import { JWT_SECRET } from "../constants";

const SALT_ROUNDS = 10;
async function createUser(req, res: Response, next: NextFunction) {
  const { firstName, lastName, userName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = {
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  };
  const response = await userModel.create(newUser);
  console.log("response", response);
  res.status(201).json({ success: true });
}
async function login(req, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401).json({ success: false, error: "Authentication failed" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, error: "Authentication failed" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      _id: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const userObject = user.toObject();
  delete userObject.password;
  res.status(200).json({ success: true, data: { user: userObject, token } });
}

export default { login, createUser };
