'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
const AddNewCategoryPage = () => {
  const router = useRouter();
  const { user, Login, logout, authToken } = useContext(AuthContext);
  // const { user } = useAuth();
  const [formData, setFormData] = useState({
    categoryName: '',
    uid: user?.uid,
  });
  console.log('user', user?.uid);

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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
          Authorization: `Bearer ${authToken}`,
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
    <>
      <div className="flex flex-row items-center w-full px-4 py-2 space-x-3 bg-slate-100 dark:bg-slate-900">
        <Link href="/categories" alt="link to categories page">
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="px-4 py-3 text-3xl font-bold">Add New Category</h1>
      </div>

      <div className="px-4 py-8">
        <form onSubmit={postCategoryData}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="label-style">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={HandleInputChange}
              className="input-style"
              placeholder="e.g. Groceries"
            />
          </div>
          <button type="submit" className="btn-style">
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNewCategoryPage;
