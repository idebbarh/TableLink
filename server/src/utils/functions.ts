const getTodaysFullDate = (): string => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;
  return fullDate;
};

export { getTodaysFullDate };
