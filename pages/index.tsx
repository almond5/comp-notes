import React, { useState } from 'react';
import { PrismaClient, User, Prisma } from '@prisma/client';
import Notes from './notes';
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const contacts: User[] = await prisma.user.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}

const index = ({ initialContacts }: { initialContacts: any }) => {
  // const [contacts, setContacts] = useState<User[]>(initialContacts);
  const [notes, setNotes] = useState<User[]>(initialContacts);
  return (
    <Notes notes={notes} />
    // <div>{contacts.map((c, i: number) => c.id)}</div>
  );
};

export default index;
