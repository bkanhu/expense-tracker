'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const CategoriesPage = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const response = await fetch(`/api/categories?uid=${user.uid}`);
  // const data = await response.json();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/categories?uid=${user.uid}`);
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
