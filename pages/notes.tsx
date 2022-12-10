import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useState } from 'react';
import NoteCreate from './noteCreate';
import NoteDelete from './noteDelete';
import NoteView from './noteView';

const Notes = () => {
  const { user, error, isLoading } = useUser();
  const [noteView, setNotesView] = useState(false);
  const [createView, setCreateView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);

  const deleteNote = () => {
    deleteView ? setDeleteView(false) : setDeleteView(true);
  };

  const viewNotes = () => {
    noteView ? setNotesView(false) : setNotesView(true);
  };

  const createNote = () => {
    createView ? setCreateView(false) : setCreateView(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!user) {
    return (
      <div>
        <p>You are not a valid user</p>
        <a href="/api/auth/login"></a>
      </div>
    );
  }

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
