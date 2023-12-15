// /app/signup/page.js

'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const SignupPage = () => {
  const router = useRouter();
  const [Load, setLoad] = useState(false);
  const { user, login, logout } = useContext(AuthContext);
  //   console.log(AuthContext);

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const HandleSignIn = async () => {
    setLoad(true);
    try {
      await login();
      router.push('/');
      console.log('from handle function to / route');
    } catch (error) {
      setLoad(false);
    }
  };
  const HandleSignOut = async () => {
    await logout();
  };
  return (
    <div>
      SignupPage
      <button
        onClick={HandleSignIn}
        className="flex items-center justify-center w-full p-3 mt-4 space-x-2 font-semibold text-white transition duration-300 bg-black rounded hover:bg-stone-600"
      >
        <span>Continue With Google</span>
      </button>
      {user ? (
        <button onClick={HandleSignOut} className="">
          <span>Logout</span>
        </button>
      ) : null}
    </div>
  );
};

export default SignupPage;
