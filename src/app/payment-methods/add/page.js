'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
const AddPaymentMethodPage = () => {
  const { user, Login, logout, authToken } = useContext(AuthContext);

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
    // e.preventDefault();
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div>
      <div>
        <form onSubmit={postPaymentMethod}>
          <label htmlFor="paymentMethodType">Payment Method Type</label>
          <select
            name="paymentMethodType"
            id="paymentMethodType"
            value={formData.paymentMethodType}
            onChange={HandleInputChange}
          >
            <option value="" disabled>
              Select a Payment Method Type
            </option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
          </select>
          <label htmlFor="paymentMethodIndicator">
            Payment Method Indicator
          </label>
          <input
            type="text"
            id="paymentMethodIndicator"
            name="paymentMethodIndicator"
            value={formData.paymentMethodIndicator}
            onChange={HandleInputChange}
          />
          <button type="submit">Add Payment Method</button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodPage;
