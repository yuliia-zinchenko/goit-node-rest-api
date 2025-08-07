import { updateById } from "../services/contactsServices.js";

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateById(id, req.body);
  res.json(result);
};
