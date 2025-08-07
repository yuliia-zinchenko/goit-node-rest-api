import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const rewriteContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item._id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item._id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await rewriteContacts(contacts);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await rewriteContacts(contacts);
  return newContact;
};

export const updateById = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item._id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await rewriteContacts(contacts);
  return contacts[index];
};
