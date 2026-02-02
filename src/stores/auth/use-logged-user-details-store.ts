import { create } from "zustand"

type UserDetails = {
  firstName: string
  lastName: string
  email: string
}

interface UserState {
  firstName: string
  lastName: string
  email: string
  isLoading: boolean
  setUser: (user: UserDetails) => void
  setLoading: (loading: boolean) => void
  clearUserDetails: () => void
}

export const useLoggedUserDetailsStore = create<UserState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  isLoading: true,
  setUser: (user) =>
    set({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isLoading: false,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearUserDetails: () => set({ firstName: "", lastName: "", email: "", isLoading: false }),
}))
