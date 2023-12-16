'use client';
import {
  BadgeIndianRupee,
  ChevronRight,
  CreditCard,
  FilePlus,
  Home,
  Layers,
  LogOut as LogOutIcon,
  PieChart,
  Settings,
  WalletCards,
} from 'lucide-react';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getFirstCharacter } from '@/utils/getFirstCharacter';

const SettingsPage = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      name: 'View Categories',
      path: '/categories',
      icon: <Layers />,
    },
    {
      name: 'Add New Category',
      path: '/categories/add',
      icon: <FilePlus />,
    },
    {
      name: 'View Payment Methods',
      path: '/payment-methods',
      icon: <WalletCards />,
    },
    {
      name: 'Add New Payment Methods',
      path: '/payment-methods/add',
      icon: <CreditCard />,
    },
  ];
  const handleLogOut = () => {
    console.log('logout');
    // logout();
  };
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900">
        <div className="w-full">
          <h1 className="px-4 py-3 text-3xl font-bold">Settings</h1>
        </div>
        <div className="w-full pb-8">
          <div className="flex px-4 py-4 space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
              <span className="text-2xl font-semibold text-black">
                {getFirstCharacter('B Kanhu Charan')}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-semibold">B Kanhu Charan</p>
              <p className="text-base font-normal">hello@email.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-auto px-4 py-4">
        {navLinks.map((link, index) => (
          <Link
            href={link.path}
            alt={Link.name}
            className={`flex flex-row border-b dark:border-slate-500 justify-between  py-6 items-center ${
              pathname === link.path
                ? 'text-slate-900'
                : 'text-slate-500 dark:text-slate-400'
            } `}
            key={index}
          >
            <div className="flex flex-row space-x-3 ">
              {link.icon}
              <span className="text-base font-medium">{link.name}</span>
            </div>
            <div>
              <ChevronRight />
            </div>
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogOut}
          className={`flex flex-row border-b dark:border-slate-500 justify-between  py-6 items-center text-slate-500 `}
        >
          <div className="flex flex-row space-x-3 dark:text-slate-400">
            <LogOutIcon />
            <span className="text-base font-medium">Logout</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SettingsPage;
