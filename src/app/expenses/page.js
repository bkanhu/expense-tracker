'use client';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ChevronLeft, ChevronRight, Dot, FileBarChart2 } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import { formatMonth } from '@/utils/formatMonth';
import { useRouter } from 'next/navigation';
const ExpensesPage = () => {
  const router = useRouter();
  const currentMonthStr = new Date().toLocaleString('default', {
    month: 'long',
  });
  const [expensesByDate, setExpensesByDate] = useState({});
  const { user, Login, logout, authToken } = useContext(AuthContext);
  // useEffect(() => {
  //   // Fetch expenses grouped by date
  //   const fetchExpensesByDate = async () => {
  //     try {
  //       console.log('user', user);
  //       const response = await fetch(`/api/expenses?uid=${user.uid}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });
  //       const data = await response.json();
  //       // console.log('Received data:', data);
  //       setExpensesByDate(data.expensesByDate || {});
  //     } catch (error) {
  //       console.error('Error fetching expenses:', error);
  //     }
  //   };

  //   fetchExpensesByDate();
  // }, []);

  // Redirect to /login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  // TODO: Add loading state
  // const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1); // Adding 1 because months are zero-indexed

  const goToPreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (
      year < currentDate.getFullYear() ||
      month < currentDate.getMonth() + 1
    ) {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };
  const unFormattedMonth = `${year}-${String(month).padStart(2, '0')}`;
  const formattedMonth = formatMonth(unFormattedMonth);
  console.log('currentMonth', currentMonth);
  useEffect(() => {
    // Function to fetch expenses based on current month
    // setCurrentMonth('11');
    const fetchExpenses = async () => {
      try {
        // Make API call with the current month data
        const response = await fetchExpensesByMonth(month, year);
        // Handle the response and display expenses
        setExpensesByDate(response.expensesByDate);
        console.log('response', response);

        // ...
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [month, year]);

  const fetchExpensesByMonth = async (month, year) => {
    // Make API call with the specified month data
    const response = await fetch(
      `/api/expenses?uid=${user.uid}&month=${month}&year=${year}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    return data || {};
  };

  // console.log('expensesByDate', expensesByDate);
  // Render expenses grouped by date
  const renderExpensesByDate = () => {
    return Object.keys(expensesByDate).map((date) => (
      <ul key={date} className="py-4 mb-2 ">
        <h2 className="px-4 text-lg font-bold">{formatDate(date)}</h2>
        {expensesByDate[date].map((expense) => (
          <li key={expense._id} className="px-4 py-2 border-b">
            <div className="flex flex-row items-center">
              {/* <div className="p-3 border border-red-400 rounded-md">
                <FileBarChart2 />
              </div> */}
              <div className="flex items-center justify-between w-full">
                <div className="">
                  <p className="text-lg font-semibold">{expense?.title} ads</p>
                  <div className="flex flex-row flex-wrap items-center space-x-1">
                    <p className="text-sm font-normal">{expense.time}</p>
                    <Dot className="" />
                    {/* <p>Paid Via: </p> */}
                    <p className="text-sm font-normal">
                      {expense.paymentMethodIndicator}
                    </p>
                    {/* <p>{expense.time}</p> */}
                    <Dot className="" />
                    <p className="text-sm font-normal">{expense.category}</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-base font-bold"> ₹ {expense.amount}</p>
                </div>
              </div>
            </div>

            {/* <p>{expense.description}</p> */}
            {/* <p>{expense.category}</p> */}
            {/* <p>{expense.paymentMethodType}</p> */}
            {/* Render other expense details */}
          </li>
        ))}
      </ul>
    ));
  };
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900">
        <div className="flex items-center justify-between w-full px-4 py-3">
          <h1 className="text-3xl font-bold ">Expenses</h1>
          <Link
            href="/expenses/add"
            alt="Link to Add Expenses page "
            className="px-4 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Expense
          </Link>
        </div>
      </div>
      {/* <div className="px-4 py-8">
        <p className="text-center">
          Spent in <span className="font-medium">{currentMonthStr}</span>
        </p>
      </div> */}

      <div className="flex justify-between px-4 py-4 border-b">
        <button onClick={goToPreviousMonth}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-medium">
          {/* {`${year}-${String(month).padStart(2, '0')}`} */}
          {formattedMonth}
          {/* {`${currentYear}-${currentMonth.toString().padStart(2, '0')}`} */}
        </span>
        <button
          onClick={goToNextMonth}
          disabled={
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() + 1
          }
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      {renderExpensesByDate()}
    </>
  );
};

export default ExpensesPage;
