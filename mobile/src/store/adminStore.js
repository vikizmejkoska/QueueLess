import { create } from 'zustand';

const useAdminStore = create((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,

  loginAdmin: ({ token, user }) =>
    set({
      token,
      user,
      isLoggedIn: true,
    }),

  logoutAdmin: () =>
    set({
      token: null,
      user: null,
      isLoggedIn: false,
    }),
}));

export default useAdminStore;