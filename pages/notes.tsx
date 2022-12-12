import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import NoteCreate from './noteCreate';
import NoteDelete from './noteDelete';
import NoteView from './noteView';
import { useRouter } from 'next/router';

const Notes = () => {
  const [noteView, setNotesView] = useState(false);
  const [createView, setCreateView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    // router.push('api/auth/signin')
    return null
  }

  const deleteNote = () => {
    deleteView ? setDeleteView(false) : setDeleteView(true);
  };

  const viewNotes = () => {
    noteView ? setNotesView(false) : setNotesView(true);
  };

  const createNote = () => {
    createView ? setCreateView(false) : setCreateView(true);
  };

  return (
    <div>
      <div className="py-8 flex justify-center">
        <div className="px-4 font-bold text-xl">
          <button
            onClick={() => {
              viewNotes();
              setCreateView(false);
              setDeleteView(false);
            }}
          >
            View My Notes
          </button>
        </div>
        <div className="px-4 font-bold text-xl">
          <button
            onClick={() => {
              createNote();
              setNotesView(false);
              setDeleteView(false);
            }}
          >
            Create Note
          </button>
        </div>
        <div className="px-4 font-bold text-xl">
          <button
            onClick={() => {
              deleteNote();
              setNotesView(false);
              setCreateView(false);
            }}
          >
            Delete Note
          </button>
        </div>
        <div>
          <button
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`${noteView ? '' : 'hidden'}`}>
        <NoteView></NoteView>
      </div>
      <div className={`${createView ? '' : 'hidden'}`}>
        <NoteCreate></NoteCreate>
      </div>
      <div className={`${deleteView ? '' : 'hidden'}`}>
        <NoteDelete></NoteDelete>
      </div>
    </div>
  );
};

export default Notes;
