import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(HttpError(404, `${id} is not found`));
  }
  next();
};
