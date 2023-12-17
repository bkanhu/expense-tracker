'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
const AddPaymentMethodPage = () => {
  const { user, Login, logout, authToken } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  };

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Post a new payment method to the database
  const postPaymentMethod = async (e) => {
    e.preventDefault();
    console.log('formData', formData);

    try {
      const res = await fetch('/api/payments-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      console.log('res', res);

      if (res.ok) {
        console.log('Payment method posted successfully.🎉');
        toast('Payment Method added successfully 🎉');
      } else {
        console.error('Failed to post Payment method.');
        toast('Failed to add Payment Method  😵');
      }
    } catch (error) {
      console.error('Error posting Payment method:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center w-full px-4 py-2 space-x-3 bg-slate-100 dark:bg-slate-900">
        <Link href="/payment-methods" alt="link to payment method page">
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="px-4 py-3 text-3xl font-bold">Add A Payment Method</h1>
      </div>
      <div className="px-4 py-8">
        <form onSubmit={postPaymentMethod}>
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
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethodIndicator" className="label-style">
              Payment Method Indicator
            </label>
            <input
              type="text"
              id="paymentMethodIndicator"
              name="paymentMethodIndicator"
              value={formData.paymentMethodIndicator}
              onChange={HandleInputChange}
              className="input-style"
              placeholder="e.g. SBI BPCL CARD"
            />
          </div>
          <button type="submit" className="btn-style">
            Add Payment Method
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPaymentMethodPage;
