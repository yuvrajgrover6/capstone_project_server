import { BaseErrorException } from "../response_handlers/base_error_exception";
import jwt, { type JwtPayload } from "jsonwebtoken";
export const checkAuthToken = (token: string) => {
  if (token === undefined) {
    throw new BaseErrorException({
      message: "Unauthorized",
      error: "token-not-found",
      logInfo: null,
      code: 401,
    });
  } else {
    return verifyToken(token);
  }
};

export const verifyToken = (token: string) => {
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET || "");
  if (verifyToken === null || typeof verifyToken === "string") {
    throw new BaseErrorException({
      message: "Session expired. Please login again",
      error: "invalid-token",
      logInfo: null,
      code: 401,
    });
  } else {
    return verifyToken;
  }
};

export const checkAdmin = (decodedToken: JwtPayload) => {
  if (decodedToken.role !== "admin") {
    throw new BaseErrorException({
      message: "User is not an admin",
      error: "forbidden",
      logInfo: null,
      code: 403,
    });
  }
};
