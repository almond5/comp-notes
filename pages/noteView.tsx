import React from 'react';

const NoteView = () => {
  return (
    <div id="projects" className="flex-col text-center py-24">
      <div
        className="mx-auto max-w-sm text-xl text-left xs:max-w-sm sm:max-w-sm 
        md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-lg"
      ></div>
      <ul
        className="mx-auto max-w-sm xs:max-w-sm sm:max-w-md 
        md:max-w-md lg:max-w-xl xl:max-w-xl 2xl:max-w-xl grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <li
          className="outline bg-stone-100 
            p-7 transition-transform hover:-translate-y-2 rounded-xl"
        >
          <a target="_blank">
            <div className="mb-1 text-lg font-bold">NAME</div>
            <p className="mb-4 text-md text-left">Details</p>
          </a>
        </li>
        <li
          className="outline bg-stone-100 
            p-7 transition-transform hover:-translate-y-2 rounded-xl"
        >
          <a target="_blank">
            <div className="mb-1 text-lg font-bold">NAME</div>
            <p className="mb-4 text-md text-left">Details</p>
          </a>
        </li>
        <div className="py-2">
          <li
            className="outline bg-stone-100 
            p-7 transition-transform hover:-translate-y-2 rounded-xl"
          >
            <a target="_blank">
              <div className="mb-1 text-lg font-bold">NAME</div>
              <p className="mb-4 text-md text-left">Details</p>
            </a>
          </li>
        </div>
        <div className="py-2">
          <li
            className="outline bg-stone-100 
            p-7 transition-transform hover:-translate-y-2 rounded-xl"
          >
            <a target="_blank">
              <div className="mb-1 text-lg font-bold">NAME</div>
              <p className="mb-4 text-md text-left">Details</p>
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default NoteView;
