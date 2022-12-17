import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Login from '../components/login';
import NoteCreate from './noteCreate';
import NoteDelete from './noteDelete';
import NoteView from './noteView';
import Leave from '../components/svgs/Leave.svg';

const Notes = (props: { notes: any }) => {
  const [noteView, setNotesView] = useState(false);
  const [createView, setCreateView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const { data: session, status: sesh } = useSession();
  const notes = props.notes;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
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
    <div className="py-10">
      <div className="absolute top-0 right-10 py-9">
        <button
          onClick={() =>
            signOut({ callbackUrl: 'http://localhost:3000/logout' })
          }
        >
          <Leave className="w-9" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="px-4 font-bold text-2xl">
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
        <div className="px-4 font-bold text-2xl">
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
        <div className="px-4 font-bold text-2xl">
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
      </div>
      <div className={`${noteView ? '' : 'hidden'}`}>
        <NoteView notes={notes} />
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
