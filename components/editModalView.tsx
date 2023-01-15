import React, { useState } from 'react';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import NoteEditModalView from './noteEditModalView';

const EditModalView = (props: { setEditModalView: any; notes: any }) => {
  const [noteEditModalView, setNotesEditModalView] = useState(false);
  const note = props.notes;

  const handleClose = () => {
    props.setEditModalView(false);
  };

  return (
    <>
      <div className={`${!noteEditModalView ? '' : 'hidden'}`}>
        <div
          className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600 
      bg-opacity-50 z-50 "
        >
          <div
            className="h-[12rem] outline bg-stone-50
        p-8 rounded-lg"
          >
            <div className="text-center break-all text-xl">
              This note will be edited:
              <div className="py-4 font-bold break-all">{note.title}</div>
            </div>
            <div className="flex justify-evenly">
              <button
                onClick={() => handleClose()}
                className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
        hover:text-gray-800 text-Lg"
              >
                <FcCancel style={{ fontSize: '40px' }} />
              </button>
              <button
                className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
          hover:text-gray-800 text-Lg"
                onClick={() => setNotesEditModalView(!noteEditModalView)}
              >
                <FcCheckmark style={{ fontSize: '40px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${noteEditModalView ? '' : 'hidden'}`}>
        <NoteEditModalView
          setEditView={undefined}
          notes={props.notes}
        ></NoteEditModalView>
      </div>
    </>
  );
};

export default EditModalView;
