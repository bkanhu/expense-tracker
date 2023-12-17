'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const ReportsPage = () => {
  const router = useRouter();
  const { user, Login, logout, authToken } = useContext(AuthContext);
  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900">
        <div className="w-full">
          <h1 className="px-4 py-3 text-3xl font-bold">Reports</h1>
        </div>
      </div>
      <div className="flex  items-center flex-col space-y-5 justify-center w-full min-h-[80vh] my-auto">
        <span className="text-5xl"> 😓</span>
        <p className="text-2xl font-bold">Work In Progress</p>
        <span>Hope it finish oneday.</span>
      </div>
    </>
  );
};

export default ReportsPage;
