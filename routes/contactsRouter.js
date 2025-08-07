import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/index.js";
import { validateBody, isValidId } from "../middlewares/index.js";
import { schemas } from "../models/contact.js";
import { ctrlWrapper } from "../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  ctrlWrapper(updateFavorite)
);

export default contactsRouter;
