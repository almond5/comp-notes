import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Login from '../components/login';
import NoteCreate from '../components/noteCreate';
import NoteDelete from '../components/noteDelete';
import Leave from '../components/svgs/Leave.svg';

const Notes = (props: { notes: any }) => {
  const [createView, setCreateView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [created, setCreated] = useState(true);
  const { status: sesh } = useSession();
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

  const createNote = () => {
    createView ? setCreateView(false) : setCreateView(true);
  };

  return (
    <div className="py-10">
      <div className="absolute top-0 right-10 py-9">
        <button
          className="rounded-full px-3 py-0.5 font-bold transition hover:bg-gray-300 hover:text-gray-800 text-Lg"
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
              setCreateView(false);
              setCreated(false);
            }}
            className={`${
              !deleteView
                ? 'mx-auto rounded-[4rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-100 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[4rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            My Notes
          </button>
        </div>
        <div className="px-4 font-bold text-2xl">
          <button
            onClick={() => {
              createNote();
              setDeleteView(false);
            }}
            className={`${
              !createView
                ? 'mx-auto rounded-[4rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-100 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[4rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            Create Note
          </button>
        </div>
      </div>
      <div className={`${createView || created ? '' : 'hidden'}`}>
        <NoteCreate setCreated={setCreated} />
      </div>
      <div className={`${deleteView ? '' : 'hidden'}`}>
        <NoteDelete notes={notes} />
      </div>
    </div>
  );
};

export default Notes;
