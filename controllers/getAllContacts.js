import { listContacts } from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};
