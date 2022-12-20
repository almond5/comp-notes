import React, { useState } from 'react';
import Notes from './notes';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Login from '../components/login';
import prisma from '../lib/prismadb';

export async function getServerSideProps() {
  const user = await prisma.user.findMany({
    where: {
      // email: session?.user?.email
    }
  });
  return {
    props: {
      user: user
    },
  };
}

const index = ({ user }: { user: any }) => {
  const [notes, setNotes] = useState<User[]>(user);
  const { data: session, status: sesh } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  return <Notes notes={notes} />;
};

export default index;
