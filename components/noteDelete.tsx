import { useSession } from 'next-auth/react';
import React from 'react';
import DeleteView from './deleteView';
import Login from './login';

const NoteDelete = (props: { notes: any }) => {
  const { status: sesh } = useSession();
  const notes = props.notes;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  if (notes === null || notes === undefined || notes.length === 0)
    return (
      <div className="mb-4 text-lg font-bold flex-col text-center py-24">
        You have no notes to delete!
      </div>
    );
  else
    return (
      <>
        <div
          className="flex-col text-center py-24 mx-auto max-w-sm xs:max-w-sm sm:max-w-md 
      md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid gap-6 md:grid-cols-1 lg:grid-cols-1"
        >
          {notes.map((note: any) => (
            <DeleteView notes={note} ></DeleteView>
          ))}
        </div>
      </>
    );
};

export default NoteDelete;
