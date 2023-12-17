'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

const CategoriesPage = () => {
  const router = useRouter();
  const { user, Login, logout, authToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const response = await fetch(`/api/categories?uid=${user.uid}`);
  // const data = await response.json();

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/categories?uid=${user.uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);
  console.log('Categories for user:', data);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900">
        <div className="flex items-center justify-between w-full px-4 py-3">
          <h1 className="text-3xl font-bold ">Categories</h1>
          <Link
            href="/categories/add"
            alt="Link to Add Categories page "
            className="px-4 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Category
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

export default CategoriesPage;
