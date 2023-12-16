'use client';
import { BadgeIndianRupee, Home, PieChart, Settings } from 'lucide-react';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const BottomNavbar = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: <Home />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <PieChart />,
    },
    {
      name: 'Expenses',
      path: '/expenses',
      icon: <BadgeIndianRupee />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex flex-row justify-between w-full h-16 gap-4 px-10 py-2 bg-slate-100">
      {navLinks.map((link, index) => (
        <Link
          href={link.path}
          alt={Link.name}
          className={`flex flex-col items-center space-y-1 ${
            pathname === link.path ? 'text-slate-900' : 'text-slate-500'
          } `}
          key={index}
        >
          {link.icon}
          <span className="text-sm">{link.name}</span>
        </Link>
      ))}

      {/* <div className="flex flex-col items-center space-y-1">
        <Home />
        <span className="text-sm">Home</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <PieChart />
        <span className="text-sm">Reports</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <BadgeIndianRupee />
        <span className="text-sm">Expanses</span>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <Settings />
        <span className="text-sm">Settings</span>
      </div> */}
    </nav>
  );
};

export default BottomNavbar;
