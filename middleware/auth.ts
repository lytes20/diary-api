import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { ErrorWithStatus, Token } from "../utils/common";
import { JWT_SECRET } from "../constants";

const checkToken: RequestHandler = async (req, res, next) => {
  try {
    const authentication_header = req.headers["authorization"];
    if (!authentication_header)
      throw new ErrorWithStatus("No Token Found", 401);

    const token = (authentication_header as string).split(" ")[1];

    const decoded = verify(token, JWT_SECRET) as Token;
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};

export default { checkToken };
