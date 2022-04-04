export const getDatesBetweenDates = (startDate: string, endDate: string) => {
  const dates: string[] = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  const endDateInDate = new Date(endDate);
  while (theDate < endDateInDate) {
    dates.push(new Date(theDate).toISOString().split("T")[0]);
    theDate.setDate(theDate.getDate() + 1);
  }
  dates.push(endDateInDate.toISOString().split("T")[0]);
  return dates;
};
