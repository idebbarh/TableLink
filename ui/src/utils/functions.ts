const addDataToLocalStorage = (dataObj: { [key: string]: any }) => {
  Object.entries(dataObj).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};

const removeDataFromLocalStorage = (keys: string[]) => {
  keys.forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });
};

export { addDataToLocalStorage, removeDataFromLocalStorage };
