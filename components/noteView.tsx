import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Login from './login';

const NoteView = (props: { notes: any }) => {
  const { status: sesh } = useSession();
  const [title, setTitle] = useState(false);
  const [date, setDate] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [descending, setDescending] = useState(false);

  let notes = props.notes;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const numAscending = new Map(
      [...notes].sort((a, b) => {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      })
    );
    window.location.reload;
    console.log(numAscending);
  };

  if (notes === null || notes === undefined || notes.length === 0)
    return (
      <div className="mb-4 text-lg font-bold flex-col text-center py-24">
        You have no notes to view!
      </div>
    );
  else
    return (
      <div>
        <div
          className="top-[11rem] absolute h-[13rem] outline bg-stone-50
            p-5 rounded-lg"
        >
          <div>
            <div className="font-bold pb-2">Sort by:</div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col checkbox-wrapper"
            >
              <label>
                <input type="checkbox" /> Title
              </label>
              <label>
                <input type="checkbox" /> Date
              </label>
              <label>
                <input type="checkbox" /> Ascending
              </label>
              <label>
                <input type="checkbox" /> Descending
              </label>
              <div className="py-1"></div>
              <button className="font-bold rounded-full px-3 py-1 transition hover:bg-gray-300 text-Lg">
                Apply
              </button>
            </form>
          </div>
        </div>
        <div
          className="flex-col text-center py-24 mx-auto max-w-xs xs:max-w-xs sm:max-w-xs 
      md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid gap-6 md:grid-cols-1 lg:grid-cols-1"
        >
          {notes.map((note: any) => (
            <div
              className="h-[17rem] outline bg-stone-50
            p-7 transition-transform hover:-translate-y-2 rounded-lg"
            >
              <div className="text-right break-all">{note.date}</div>
              <div className="mb-1 text-lg font-bold">{note.title}</div>
              <p className="mb-4 text-md text-left break-all">{note.note}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default NoteView;
