import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TAuth = {
    jwt: string,
    setJwt: (jwt: string) => void
}
const useAuth = create(persist<TAuth>(
    (set) => ({
        jwt: "",
        setJwt: (jwt) => set({ jwt })
    }),
    {
        name: 'auth-store',
    }
));

export default useAuth;