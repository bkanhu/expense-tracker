import React from 'react';

const ExpensesPage = () => {
  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
  });

  return (
    <>
      <div className="px-4 py-8">
        <p className="text-center">
          Spent in <span className="font-medium">{currentMonth}</span>
        </p>
      </div>
    </>
  );
};

export default ExpensesPage;
