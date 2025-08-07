import HttpError from "../helpers/HttpError.js";

export const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].type === "object.min") {
        return next(HttpError(400, "Body must have at least one field"));
      }
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};
