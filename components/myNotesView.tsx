import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import DeleteView from './myNotesDeleteView';
import Login from './loginView';

const MyNotesView = (props: { notes: any }) => {
  const { status: sesh } = useSession();
  const [descending, setDescending] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [notes, setNotes] = useState(props.notes);
  const [title, setTitle] = useState(false);
  const [date, setDate] = useState(false);
  const [count, setCount] = useState(0);

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title) {
      if (descending) {
        const notesDescending = Array.from(notes).sort((a: any, b: any) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA > titleB) return -1;
          else if (titleA < titleB) return 1;
          else return 0;
        });

        setNotes(notesDescending);
      } else {
        const notesAscending = Array.from(notes).sort((a: any, b: any) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) return -1;
          else if (titleA > titleB) return 1;
          else return 0;
        });

        setNotes(notesAscending);
      }
    } else if (date) {
      if (descending) {
        const notesDescending = Array.from(notes).sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() > dateB.getTime()) return -1;
          else if (dateA.getTime() < dateB.getTime()) return 1;
          else return 0;
        });

        setNotes(notesDescending);
      } else {
        const notesAscending = Array.from(notes).sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() < dateB.getTime()) return -1;
          else if (dateA.getTime() > dateB.getTime()) return 1;
          else return 0;
        });

        setNotes(notesAscending);
      }
    }
  };

  if (
    notes === null ||
    notes === undefined ||
    notes.length === 0 ||
    count === notes.length
  )
    return (
      <div className="mb-4 text-lg font-bold flex-col text-center py-20">
        <div
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] 
                border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg"
        >
          You have no notes!
        </div>
      </div>
    );
  else
    return (
      <>
        <div
          className="top-[10.25rem] absolute h-[13rem] outline bg-stone-50
            p-5 rounded-lg"
        >
          <div>
            <div className="font-bold pb-2">Sort by:</div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col checkbox-wrapper"
            >
              <label>
                <input
                  disabled={date}
                  onChange={() => setTitle(!title)}
                  type="checkbox"
                />{' '}
                Title
              </label>
              <label>
                <input
                  disabled={title}
                  onChange={() => setDate(!date)}
                  type="checkbox"
                />{' '}
                Date
              </label>
              <label>
                <input
                  disabled={descending}
                  onChange={() => setAscending(!ascending)}
                  type="checkbox"
                />{' '}
                Ascending
              </label>
              <label>
                <input
                  disabled={ascending}
                  onChange={() => setDescending(!descending)}
                  type="checkbox"
                />{' '}
                Descending
              </label>
              <div className="py-1"></div>
              <button
                className="font-bold rounded-full px-3 py-1 transition 
                      hover:bg-neutral-400 text-Lg"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
        <div
          className="py-[4.4rem] flex-col text-center mx-auto max-w-sm xs:max-w-sm 
          sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid md:grid-cols-1 
          lg:grid-cols-1"
        >
          {notes.map((note: any) => (
            <DeleteView
              notes={note}
              count={count}
              counter={setCount}
            ></DeleteView>
          ))}
        </div>
      </>
    );
};

export default MyNotesView;
