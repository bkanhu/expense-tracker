'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
const PaymentMethodsPage = () => {
  const { user, Login, logout, authToken } = useContext(AuthContext);
  const router = useRouter();

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900">
        <div className="flex items-center justify-between w-full px-4 py-3">
          <h1 className="text-3xl font-bold ">Payment Methods</h1>
          <Link
            href="/payment-methods/add"
            alt="Link to Add payment methods page "
            className="px-4 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Payment Method
          </Link>
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

export default PaymentMethodsPage;
