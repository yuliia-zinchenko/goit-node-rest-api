import { addContact } from "../services/contactsServices.js";

export const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};
