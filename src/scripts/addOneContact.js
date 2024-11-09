import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  const newContacts = createFakeContact();
  const contacts = await readContacts();
  await writeContacts([...contacts, newContacts]);
};

addOneContact();
