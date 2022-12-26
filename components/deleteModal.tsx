import React from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';

const DeleteModal = (props: { notes: any }) => {
  const note = props.notes;
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600 bg-opacity-50 z-50 ">
      <div
        className="h-[12rem] outline bg-stone-50
            p-8 rounded-lg"
      >
        <div className="text-center break-all text-xl">
          This note will be deleted:
          <div className="py-4 font-bold break-all">{note.title}</div>
        </div>
        <button className='px-4 rounded-full py-0.5 font-bold transition hover:bg-gray-300 hover:text-gray-800 text-Lg' onClick={() => {}}>
          <FcCancel style={{ fontSize: '40px' }} />
        </button>
        <button className='px-4 rounded-full py-0.5 font-bold transition hover:bg-gray-300 hover:text-gray-800 text-Lg' onClick={() => {}}>
          <FcCheckmark style={{ fontSize: '40px' }} />
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
