// Import necessary components and styles
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
import { Doughnut } from 'react-chartjs-2';

const SpentBudgetChart = ({ spent, budget }) => {
  const remaining = budget - spent;
  const exceed = spent - budget > 0 ? spent - budget : 0;

  const data = {
    labels: ['Spent', 'Budget', 'Exceed'],
    datasets: [
      {
        data: [spent, remaining, exceed],
        backgroundColor: ['#FF6384', '#36A2EB', '#FF0000'], // Colors for spent and remaining budget
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FF0000'],
      },
    ],
  };

  return (
    <>
      <div className="w-full h-40 mt-12 ">
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            cutoutPercentage: 80,
          }}
        />
      </div>
      <div className="flex items-center justify-between w-2/3 gap-8 m-auto mt-8">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-[#FF6384] rounded-full"></div>
            <p className="text-base font-medium text-slate-200">Spent</p>
          </div>
          <p className="text-xl font-bold text-white">{spent}</p>
        </div>
        <div className="h-8 w-[1px] bg-slate-50"></div>
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-[#36A2EB] rounded-full"></div>
            <p className="text-base font-medium text-slate-200">Budget</p>
          </div>
          <p className="text-xl font-bold text-white">{budget}</p>
        </div>
        {/* <div className="text-center">
          <p className="text-lg font-semibold">Remaining: {budget - spent}</p>
          <p className="text-lg font-semibold">Spent: {spent}</p>
        </div> */}
      </div>
    </>
  );
};

export default SpentBudgetChart;
