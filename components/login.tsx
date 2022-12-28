import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div className="flex flex-col text-center">
        <div className="flex flex-col py-12 font-semibold text-3xl">
          Clippy Notes
        </div>
        <div className="py-[10px]">
          <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="mx-auto rounded-full w-max border border-gray-800 px-4 py-2 
            font-bold transition hover:bg-gray-500 hover:text-gray-800 text-Lg"
          >
            Sign-in
          </Link>
        </div>
      </div>
    </>
  );
}
