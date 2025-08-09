import express from "express";
import { authenticate, validateBody, upload } from "../middlewares/index.js";
import { ctrlWrapper } from "../helpers/index.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from "../controllers/auth/index.js";
import { schemas } from "../models/user.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);

authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(login)
);

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.get("/logout", authenticate, ctrlWrapper(logout));

authRouter.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(updateSubscription)
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

export default authRouter;
