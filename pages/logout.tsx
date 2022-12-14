import Link from 'next/link';
import React from 'react';

const Notes = () => {
  return (
    <>
      <div className="flex flex-col text-center">
      <div className="flex flex-col py-12 font-semibold text-3xl">
          You have been logged out!
        </div>
        <div className="py-[12px]">
          <Link
            href="/notes"
            className="mx-auto rounded-full w-max border border-gray-800 px-6 py-3 
                  font-bold transition hover:bg-gray-500 hover:text-gray-800"
          >
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Notes;
