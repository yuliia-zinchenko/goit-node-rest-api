import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";

export const verify = async (res, req) => {
  const { verificationToken } = req.params;
  const user = User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Email verify success",
  });
};
