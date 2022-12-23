import React, { useState } from 'react';
import Notes from './noteMain';
import { Note } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import Login from '../components/login';
import prisma from '../lib/prismadb';

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    const notes = await prisma.note.findMany({
      where: {
        user: user!,
        userId: user?.id,
      }
    });

    return {
      props: {
        notesFromDB: notes,
      },
    };
  } catch (error) {
    const notes = null;

    return {
      props: {
        notesFromDB: notes,
      },
    };
  }
}

const index = ({ notesFromDB }: { notesFromDB: any }) => {
  const [notes] = useState<Note[]>(notesFromDB);
  const { status: sesh, data } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  return <Notes notes={notes} />;
};

export default index;
