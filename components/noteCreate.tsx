import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const NoteCreate = (props: { setCreated: any }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { data: session } = useSession();

  const submitNote = async (note: {
    title: string;
    body: string;
    user:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        }
      | undefined;
  }) => {
    const response = await fetch('/api/noteCreate', {
      method: 'POST',
      body: JSON.stringify(note),
    });

    const data = await response.json();
    console.log(data);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = session?.user;
    const note = { title, body, user };
    submitNote(note);
    await timeout(1000);
    props.setCreated(true);
    setBody('');
    setTitle('');
  };

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-4 text-lg font-bold">
            Title:
            <textarea
              maxLength={45}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              rows={1}
              cols={45}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>{' '}
          </div>

          <div className="mb-4 text-lg font-bold">
            Note:
            <div>
              <textarea
                maxLength={287}
                value={body}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={45}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>{' '}
            </div>
          </div>
        </div>
        <div className="py-[14px]">
          <button>
            <div
              className="text-lg mx-auto rounded-full w-max border-2 border-gray-800 px-3 py-1 
                font-bold transition hover:bg-gray-500 hover:text-gray-800"
            >
              Submit
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreate;
