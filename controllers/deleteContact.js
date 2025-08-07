import { removeContact } from "../services/contactsServices.js";
import { HttpError } from "../helpers/index.js";

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact removed" });
};
