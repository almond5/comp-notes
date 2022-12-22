import { useSession } from 'next-auth/react';
import React from 'react';
import Login from '../components/login';

const NoteView = (props: { notes: any }) => {
  const notes = props.notes;
  const { status: sesh } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  if (notes === null || notes.length === 0)
    return (
      <div className="mb-4 text-lg font-bold flex-col text-center py-24">
        You have no notes!
      </div>
    );
  else
    return (
      <div
        className="flex-col text-center py-24 mx-auto max-w-sm xs:max-w-sm sm:max-w-md 
      md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid gap-6 md:grid-cols-1 lg:grid-cols-1"
      >
        {notes.map((note: any) => (
          <div className="">
            <div
              className="h-[17rem] outline bg-stone-100
            p-7 transition-transform hover:-translate-y-2 rounded-lg"
            >
              <a>
                <div className="text-right break-all">12/12/2022</div>
                <div className="mb-1 text-lg font-bold">{note.title}</div>
                <p className="mb-4 text-md text-left break-all">{note.note}</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    );
};

export default NoteView;
