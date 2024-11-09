import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  const constants = await readContacts();
  return constants;
};

console.log(await getAllContacts());
