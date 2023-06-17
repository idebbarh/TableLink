const getTodaysFullDate = (): string => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;
  return fullDate;
};

export { getTodaysFullDate };
