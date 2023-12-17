export function formatMonth(monthString) {
  const [year, month] = monthString.split('-');
  const date = new Date(year, month - 1);
  function getMonthName(monthIndex) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[monthIndex];
  }
  return `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
}

// // Usage:
// const formattedMonth = formatMonth('2022-12');
// console.log(formattedMonth); // Output: 'Dec 2022'
