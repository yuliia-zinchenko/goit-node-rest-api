import { Contact } from "../../models/contact.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const result = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};
