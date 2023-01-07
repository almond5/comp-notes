import { signOut, useSession } from 'next-auth/react';
import NoteCreate from '../components/createNoteView';
import NoteDelete from '../components/myNotesView';
import Leave from '../components/svgs/Leave.svg';
import Login from '../components/loginView';
import React, { useState } from 'react';

const CompNotesView = (props: { notes: any }) => {
  const [createNoteView, setcreateNoteView] = useState(false);
  const [myNotesView, setMyNotesView] = useState(false);
  const { status: sesh } = useSession();
  const notes = props.notes;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  const deleteNote = () => {
    myNotesView ? setMyNotesView(false) : setMyNotesView(true);
  };

  const createNote = () => {
    createNoteView ? setcreateNoteView(false) : setcreateNoteView(true);
  };

  return (
    <div className="py-10">
      <div className="absolute top-0 right-10 py-9">
        <button
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
          onClick={() =>
            signOut({ callbackUrl: 'http://localhost:3000/logout' })
          }
        >
          <Leave className="w-9" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="text-shadow px-4 font-bold text-2xl">
          <button
            onClick={() => {
              deleteNote();
              setcreateNoteView(false);
            }}
            className={`${
              !myNotesView
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            My Notes
          </button>
        </div>
        <div className="px-4 font-bold text-2xl">
          <button
            onClick={() => {
              createNote();
              setMyNotesView(false);
            }}
            className={`${
              !createNoteView
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            Create Note
          </button>
        </div>
      </div>
      <div
        className={`${!createNoteView && !myNotesView ? 'py-16' : 'hidden'}`}
      >
        <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800">
          Welcome to Comp Notes &#x1F603;{' '}
        </div>
      </div>
      <div className={`${createNoteView ? '' : 'hidden'}`}>
        <NoteCreate />
      </div>
      <div className={`${myNotesView ? '' : 'hidden'}`}>
        <NoteDelete notes={notes} />
      </div>
    </div>
  );
};

export default CompNotesView;
