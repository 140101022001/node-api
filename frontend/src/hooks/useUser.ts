import { create } from 'zustand';

type TUser = {
    id?: number,
    name?: string,
    avatar?: string,
    email?:string
}

type TUserStore = {
    user: TUser
    setUser: (user: TUser) => void
}
const useUser = create<TUserStore>(
    (set) => ({
        user: {},
        setUser: (user) => set({ user })
    }),
);

export default useUser;