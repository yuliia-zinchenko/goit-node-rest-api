import { Contact } from "../../models/contact.js";
import { HttpError } from "../../helpers/index.js";

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact removed" });
};
