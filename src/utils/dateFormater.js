export const formattedDate = (date) => {
  const optionsDate = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const indianDate = new Date(date).toLocaleString('en-IN', optionsDate);
  const indianTime = new Date(date).toLocaleString('en-IN', optionsTime);

  return { date: indianDate, time: indianTime };
};
