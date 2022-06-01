export const date = (day: number, month: number, year: number) => {
  const theDate = new Date();

  theDate.setDate(day);
  theDate.setMonth(month - 1);
  theDate.setFullYear(year);

  return theDate;
};
