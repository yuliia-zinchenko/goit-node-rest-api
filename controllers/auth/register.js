import { User } from "../../models/user.js";
import {
  HttpError,
  createVerifyEmail,
  sendEmail,
} from "../../helpers/index.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl: result.avatarURL,
    verificationToken: result.verificationToken,
  });
};
