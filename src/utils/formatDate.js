export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date

  function getMonthName(monthIndex) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[monthIndex];
  }

  return `${date.getDate().toString().padStart(2, '0')} ${getMonthName(
    date.getMonth()
  )}`;
}

// // Usage:
// const formattedDate = formatDate('2022-12-02');
// console.log(formattedDate); // Output: '02 Dec'
