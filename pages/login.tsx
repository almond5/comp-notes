import React from 'react';
import Link from 'next/link'

const Login = () => {
  return (
    <div className="flex flex-col text-center">
      <div className="flex flex-col py-12 font-semibold text-3xl">
        Welcome to Notes
      </div>
      <div className="py-[20px]">
        <Link href="/notes"
          className="mx-auto rounded-full w-max border border-gray-800 px-6 py-2 
              font-bold transition hover:bg-gray-500 hover:text-gray-800"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
