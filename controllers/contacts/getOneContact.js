import { Contact } from "../../models/contact.js";
import { HttpError } from "../../helpers/index.js";

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
