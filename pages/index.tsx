import { getSession, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import CompNotesView from './compNotesView';
import React, { useState } from 'react';
import { Note } from '@prisma/client';
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

const Index = ({ notesFromDB }: { notesFromDB: any }) => {
  const [notes] = useState<Note[]>(notesFromDB);
  const { status: session } = useSession();

  if (session === 'loading') {
    return null;
  }

  if (session === 'unauthenticated') {
    return <LoginView />;
  }

  return <CompNotesView notes={notes} />;
};

export default Index;
