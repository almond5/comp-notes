import React from 'react';

const NoteCreate = () => {
  return (
    // <div className="flex-col text-center py-24">
    //   <div
    //     className="mx-auto max-w-sm text-xl text-left xs:max-w-sm sm:max-w-sm 
    //     md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-lg"
    //   >
    //     <div className="mb-4 text-lg font-bold">Title: </div>
        
    //     <p className="mb-4 text-lg font-bold">Note: </p>
    //   </div>
    // </div>
    <form action="/api/form" method="post">
    <label htmlFor="first">First Name</label>
    <input type="text" id="first" name="first" required />

    <label htmlFor="last">Last Name</label>
    <input type="text" id="last" name="last" required />

    <button type="submit">Submit</button>
  </form>
  );
};

export default NoteCreate;
