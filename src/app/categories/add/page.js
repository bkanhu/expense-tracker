'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
const AddNewCategoryPage = () => {
  const { user, Login, logout } = useContext(AuthContext);
  // const { user } = useAuth();
  const [formData, setFormData] = useState({
    categoryName: '',
    uid: user?.uid,
  });
  console.log('user', user?.uid);
  const HandleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Post a new category to the database
  const postCategoryData = async (e) => {
    e.preventDefault();
    console.log('formData', formData);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('res', res);

      if (res.ok) {
        console.log('Category data posted successfully.🎉');
        toast('Category added successfully 🎉');
      } else {
        console.error('Failed to post category data.');
        toast('Failed to add Category  😵');
      }
    } catch (error) {
      console.error('Error posting category data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={postCategoryData}>
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={formData.categoryName}
          onChange={HandleInputChange}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddNewCategoryPage;
