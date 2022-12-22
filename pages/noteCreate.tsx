import React, { useState } from 'react';

const NoteCreate = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const note = { date, title, body };
    await newNote(note)
    setBody('');
    setTitle('');
    setDate('')
  };

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-sm text-xl text-left xs:max-w-sm sm:max-w-sm 
        md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-lg"
        >
          <div className="mb-4 text-lg font-bold">
            Title:
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={1}
              cols={50}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>{' '}
          </div>

          <div className="mb-4 text-lg font-bold">
            Note:
            <div>
              <textarea
                value={body}
                onChange={(e) => [setBody(e.target.value), setDate(new Date().toUTCString)]}
                required
                rows={10}
                cols={50}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>{' '}
            </div>
          </div>
        </div>
        <div className="py-[12px]">
          <div
            className="mx-auto rounded-full w-max border border-gray-800 px-4 py-2 
                font-bold transition hover:bg-gray-500 hover:text-gray-800"
          >
            <button>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteCreate;

async function newNote(note: { date: string, title: string; body: string; }) {
  const response = await fetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
}
