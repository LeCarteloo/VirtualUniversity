import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectUser = asyncHandler(async (req, res, next) => {
  // Checking if token is provided
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401);
    throw new Error("Token not provided - Not authorized");
  }

  try {
    /* Getting the token from header (Bearer) build like: Bearer <token> */
    const token = req.headers.authorization.split(" ")[1];

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adding user id and role to API request
    const user = await User.findById(decoded.id).select("_id role");
    req.user = user;

    // Call next
    next();
  } catch (error) {
    // Invalid token
    res.status(403);
    throw new Error("Not authorized");
  }
});

export { protectUser };
