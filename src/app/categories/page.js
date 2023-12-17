'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

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
  return <div></div>;
};

export default CategoriesPage;
