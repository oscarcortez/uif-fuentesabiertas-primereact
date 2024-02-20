import { create } from "zustand";

// its being used here: src\layout\Dashboard\index.jsx get

const getInitialState = () => {
  const localStorageState = localStorage.getItem("countryCode");
  return localStorageState ? JSON.parse(localStorageState) : "ES";
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("countryCode", JSON.stringify(state.code));
};

export const useCountryStore = create((set) => ({
  code: getInitialState(),
  setCode: (code) => {
    saveToLocalStorage({ code });
    set({ code });
  },
}));
