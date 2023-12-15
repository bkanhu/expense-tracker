'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const AddExpensesPage = () => {
  const [Load, setLoad] = useState(false);
  const { user, login, logout } = useContext(AuthContext);

  // Redirect if the user is already authenticated
  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [user, router]);

  const [formData, setFormData] = useState({});

  // Post a new expense to the database
  const postExpenseData = async (user) => {
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
  return <div></div>;
};

export default AddExpensesPage;
