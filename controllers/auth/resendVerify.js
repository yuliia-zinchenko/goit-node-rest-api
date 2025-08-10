import { User } from "../../models/user.js";
import {
  HttpError,
  createVerifyEmail,
  sendEmail,
} from "../../helpers/index.js";

export const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Email not found");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);
  res.json({
    message: "Email verification resend",
  });
};
