import { create } from "zustand";

// its being used here: src\layout\Dashboard\index.jsx get
export const useNavigationStore = create((set) => ({
  navigate: "/dashboard",
  setNavigate: (navigate) => set({ navigate }),
}));
