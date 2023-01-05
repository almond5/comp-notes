import { useSession } from 'next-auth/react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';

const Modal = (props: {
  notes: any;
  setDeleted: any;
  count: any;
  setCount: any;
}) => {
  const { data: session } = useSession();
  const note = props.notes;
  const title = note.title;
  const body = note.body;
  const date = note.date;
  const [edit, setEdit] = useState(false);

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleDelete = async () => {
    const user = session?.user;
    const note = { title, body, user, date };
    await deleteNote(note);
    props.setDeleted(true);
    props.setCount(props.count + 1);
    await timeout(1000);
  };

  const deleteNote = async (note: {
    title: string;
    body: string;
    date: string;
    user:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        }
      | undefined;
  }) => {
    const response = await fetch('/api/noteDelete', {
      method: 'POST',
      body: JSON.stringify(note),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600 
      bg-opacity-50 z-50"
    >
      <div
        className="h-[12rem] outline bg-stone-50
        p-8 rounded-lg"
      >
        <div className={`${edit ? '' : 'hidden'}`}></div>
        <div className="text-center break-all text-xl">
          Edit or delete this note?
          <div className="py-4 font-bold break-all">{note.title}</div>
        </div>
        <div className="flex justify-around">
          <button
            className="px-4 rounded-full py-0.5 font-bold transition hover:bg-gray-300 
          hover:text-gray-800 text-Lg"
            onClick={() => setEdit(true)}
            
          >
            <FaEdit style={{ fontSize: '34px' }} />
          </button>
          <button
            className="px-4 rounded-full py-0.5 font-bold transition hover:bg-gray-300 
          hover:text-gray-800 text-Lg"
            onClick={() => handleDelete()}
          >
            <FaTrashAlt style={{ fontSize: '32px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
