// /app/login/page.js

'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const [Load, setLoad] = useState(false);
  const { user, login, logout } = useContext(AuthContext);
  //   console.log(AuthContext);

  // Redirect if the user is already authenticated
  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [user, router]);

  useEffect(() => {
    if (user) {
      // Assuming you have a function to check if the user exists in your DB
      checkIfUserExists(user);
      console.log(user.uid);
    }
  }, [user]);

  const checkIfUserExists = async (user) => {
    try {
      // Fetch endpoint to check if user exists based on 'user.uid'
      const res = await fetch(`/api/users/${user.uid}`);
      const data = await res.json();
      console.log('data', data);
      if (data === null) {
        await postUserData(user); // Post user info if not found
      }
      console.log('checking if user exist');
      router.push('/'); // Redirect to homepage after login
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const postUserData = async (user) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log('res', res);

      if (res.ok) {
        console.log('User data posted successfully.');
      } else {
        console.error('Failed to post user data.');
      }
    } catch (error) {
      console.error('Error posting user data:', error);
    }
  };

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
      LoginPage
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

export default LoginPage;
