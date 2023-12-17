'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const AddExpensesPage = () => {
  const [Load, setLoad] = useState(false);
  const { user, login, logout, authToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedPaymentMethods, setFetchedPaymentMethods] = useState([]);
  // Redirect if the user is already authenticated
  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [user, router]);
  // console.log('user', user);

  const [formData, setFormData] = useState({
    amount: 0.0,
    title: '',
    description: '',
    date: '',
    time: '',
    category: '',
    paymentMethodType: '',
    paymentMethodIndicator: '',
    uid: user?.uid,
  });

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // e.preventDefault();
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Static Categories
  const staticCategories = [
    'Food & Drinks',
    'Groceries',
    'Shopping',
    'Entertrainment',
    'Fuel',
    'Commute',
    'Travel',
    'Personal Care',
    'Bills & Utilities',
    'Rent',
    'Home Service',
    'Insurance',
    'Investment',
    'Education',
    'Medical',
    'Fitness',
    'Pets',
    'Credit Cards Bills',
    'Loans',
    'Finance',
    'Charity',
    'Transfer',
    'Self Transfer',
    'ATM',
    'Fees & Charges',
    'Challan & Fines',
  ];
  // Fetch Categories

  const fetchCategoriesByAuthUser = async () => {
    try {
      const response = await fetch(`/api/categories?uid=${user.uid}`);
      const data = await response.json();
      const fetchedCategoryNames = data.map(
        (category) => category.categoryName
      );
      setFetchedCategories(fetchedCategoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (user) fetchCategoriesByAuthUser();
  }, [user]);

  // Merge Static and Fetched Categories Array to a single array.
  // Also remove duplicates from the array and sort in alphabetical order
  useEffect(() => {
    if (fetchedCategories) {
      const mergedCategories = [
        ...new Set([...staticCategories, ...fetchedCategories]),
      ];
      const sortedCategories = mergedCategories.sort((a, b) =>
        a.localeCompare(b)
      );
      setCategories(sortedCategories);
    }
  }, [fetchedCategories]);

  // Get payment methods from the database and set them in state
  useEffect(() => {
    const fetchData = async () => {
      // console.log('Fetching data for user:', user.uid);
      try {
        const response = await fetch(`/api/payments-methods?uid=${user.uid}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        // console.log('Received data:', data);
        setFetchedPaymentMethods(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // finally {
      // setLoading(false);
      // console.log('Payment methods for user:', fetchedPaymentMethods);
      // }
    };

    if (user) {
      fetchData();
    }
  }, [user]); // Include 'user' in the dependency array

  const fetchPaymentMethodsByAuthUser = async () => {
    try {
      const response = await fetch(`/api/payments-methods?uid=${user.uid}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setFetchedPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  useEffect(() => {
    if (user) fetchPaymentMethodsByAuthUser();
  }, [user]);

  // From the fetched payment methods, get the payment method types and set them in state
  const paymentMethodTypes = fetchedPaymentMethods.map((paymentMethod) => {
    return paymentMethod.paymentMethodType;
  });

  // From the fetched payment methods, get the payment method indicators and set them in state
  const paymentMethodIndicators = fetchedPaymentMethods.map((paymentMethod) => {
    return paymentMethod.paymentMethodIndicator;
  });

  // Post a new expense to the database
  const postExpenseData = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      console.log('res', res);

      if (res.ok) {
        console.log('Expense added successfully.');
        toast('Expense added successfully 🎉');
      } else {
        console.error('Failed to add Expense.');
        toast('Failed to add Expense  😵');
      }
    } catch (error) {
      console.error('Error posting user data:', error);
      toast('Failed to add Expense. so  😵');
    }

    console.log('formData', formData);
  };
  return (
    <>
      <div className="flex flex-row items-center w-full px-4 py-2 space-x-3 bg-slate-100 dark:bg-slate-900">
        <ChevronLeft className="w-8 h-8" />
        <h1 className="px-4 py-3 text-3xl font-bold">Add An Expense</h1>
      </div>
      <div className="px-4 py-8 ">
        <form onSubmit={postExpenseData}>
          <div className="mb-4">
            <label htmlFor="amount" className="label-style">
              Amount
            </label>
            <input
              className="input-style"
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="label-style">
              Title
            </label>
            <input
              className="input-style"
              type="number"
              id="title"
              name="title"
              value={formData.title}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            {' '}
            <label htmlFor="description" className="label-style">
              Description
            </label>
            <input
              className="textarea-style"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            {' '}
            <label htmlFor="date" className="label-style">
              Date
            </label>
            <input
              className="input-style"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={HandleInputChange}
            />
          </div>
          <div className="mb-4">
            {' '}
            <label htmlFor="time" className="label-style">
              Time
            </label>
            <input
              className="input-style"
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={HandleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="label-style">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={HandleInputChange}
              className="select-style"
            >
              <option value="" disabled>
                Select a Payment Method Type
              </option>
              {categories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethodType" className="label-style">
              Payment Method Type
            </label>
            <select
              name="paymentMethodType"
              id="paymentMethodType"
              value={formData.paymentMethodType}
              onChange={HandleInputChange}
              className="select-style"
            >
              <option value="" disabled>
                Select a Payment Method Type
              </option>
              {paymentMethodTypes.map((paymentMethodType) => {
                return (
                  <option value={paymentMethodType}>{paymentMethodType}</option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethodIndicator" className="label-style">
              Payment Method Indicator
            </label>
            <select
              name="paymentMethodIndicator"
              id="paymentMethodIndicator"
              value={formData.paymentMethodIndicator}
              onChange={HandleInputChange}
              className="select-style"
            >
              <option value="" disabled>
                Select a Payment Method Indicator
              </option>
              {paymentMethodIndicators.map((paymentMethodIndicator) => {
                return (
                  <option value={paymentMethodIndicator}>
                    {paymentMethodIndicator}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddExpensesPage;
