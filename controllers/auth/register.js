import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl: result.avatarURL,
  });
};
