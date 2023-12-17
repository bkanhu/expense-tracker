// /app/page.js

'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import SpentBudgetChart from '@/components/charts/SpentBudgetChart';
export default function Home() {
  const router = useRouter();
  const [Load, setLoad] = useState(false);
  const { user, Login, logout } = useContext(AuthContext);
  // console.log(AuthContext);

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  const HandleSignOut = async () => {
    await logout();
  };
  const currentMonthStr = new Date().toLocaleString('default', {
    month: 'long',
  });
  return (
    <>
      <div className="relative w-full m-auto px-4 py-12 bg-black h-[450px]">
        <p className="text-center text-slate-300">
          Spent in{' '}
          <span className="font-medium text-white">{currentMonthStr}</span>
        </p>
        {/* <SpentBudgetChart spent={10000} budget={5000} /> */}
        <div className="flex flex-col items-center justify-center my-8">
          <div className="flex items-center justify-center w-40 h-40 border-8 rounded-full border-slate-500">
            <p className="text-xl font-bold text-white "> 1000</p>
          </div>
          <div className="flex items-center justify-between w-2/3 gap-8 m-auto mt-8">
            <div className="flex flex-col items-center justify-center gap-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-[#FF6384] rounded-full"></div>
                <p className="text-base font-medium text-slate-200">Spent</p>
              </div>
              <p className="text-xl font-bold text-white">50000</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-50"></div>
            <div className="flex flex-col items-center justify-center gap-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-[#36A2EB] rounded-full"></div>
                <p className="text-base font-medium text-slate-200">Budget</p>
              </div>
              <p className="text-xl font-bold text-white">15000</p>
            </div>
            {/* <div className="text-center">
          <p className="text-lg font-semibold">Remaining: {budget - spent}</p>
          <p className="text-lg font-semibold">Spent: {spent}</p>
        </div> */}
          </div>
        </div>
        <p className="mt-8 text-xs text-center text-slate-50">
          Static for now.😵
        </p>
      </div>
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
    </>
  );
}
