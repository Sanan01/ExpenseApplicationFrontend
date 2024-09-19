export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    throw Error();
  } catch (e) {
    console.error("Error getting item from local storage", e);
    return null;
  }
};

export const setItem = (key, value) => {
  const storeValue = JSON.stringify(value);
  return localStorage.setItem(key, storeValue);
};

export const removeItem = (key) => localStorage.removeItem(key);

export const clearAllData = () => localStorage.clear();
