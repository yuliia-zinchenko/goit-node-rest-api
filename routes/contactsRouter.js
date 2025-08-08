import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contacts/index.js";
import { validateBody, isValidId, authenticate } from "../middlewares/index.js";
import { schemas } from "../models/contact.js";
import { ctrlWrapper } from "../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", authenticate, isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(deleteContact)
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  ctrlWrapper(updateFavorite)
);

export default contactsRouter;
