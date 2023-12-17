// /app/page.js

'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
export default function Home() {
  const router = useRouter();
  const [Load, setLoad] = useState(false);
  const { user, Login, logout } = useContext(AuthContext);
  // console.log(AuthContext);

  // Redirect to /signup if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  const HandleSignOut = async () => {
    await logout();
  };
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      hello dashboard djfnkjdsnfjkdsnkjdsnfkjn
      <button
        onClick={HandleSignOut}
        className="flex items-center justify-center w-full p-3 mt-4 space-x-2 font-semibold text-white transition duration-300 bg-black rounded hover:bg-stone-600"
      >
        {' '}
        <span>sign out</span>
      </button>
    </main>
  );
}
