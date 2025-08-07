import { Contact } from "../models/contact.js";

export const getAllContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};
