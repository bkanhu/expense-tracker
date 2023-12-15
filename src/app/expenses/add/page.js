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

  const [formData, setFormData] = useState({
    amount: 0.0,
    description: '',
    date: '',
    category_id: '',
    uid: user?.uid,
  });

  const HandleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Post a new expense to the database
  const postExpenseData = async (user) => {
    // try {
    //   const res = await fetch('/api/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   });
    //   console.log('res', res);

    //   if (res.ok) {
    //     console.log('User data posted successfully.');
    //   } else {
    //     console.error('Failed to post user data.');
    //   }
    // } catch (error) {
    //   console.error('Error posting user data:', error);
    // }

    console.log('formData', formData);
  };
  return (
    <div>
      <form onSubmit={postExpenseData}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={HandleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={HandleInputChange}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={HandleInputChange}
        />
        <label htmlFor="category_id">Category</label>
        <input
          type="text"
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={HandleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddExpensesPage;
