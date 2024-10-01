export const useLocalStorage = (key, initialValue) => {
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // Si no existe en localStorage, usa initialValue
    } catch (error) {
      return initialValue;  // Si hay un error, también usa initialValue
    }
  };

  const setItem = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { getItem, setItem, removeItem };
};
