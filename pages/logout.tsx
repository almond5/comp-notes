import Link from 'next/link';
import React from 'react';

const Notes = () => {
  return (
    <div>
      You have been logged out!
      <button>
        <Link href={'/notes'}>
      Home</Link>
      </button>
    </div>
  );
};

export default Notes;