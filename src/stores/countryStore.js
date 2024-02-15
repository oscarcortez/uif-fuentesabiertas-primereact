import { create } from "zustand";

// its being used here: src\layout\Dashboard\index.jsx get
export const useCountryStore = create((set) => ({
  code: "ES",
  setCode: (code) => set({ code }),
}));
