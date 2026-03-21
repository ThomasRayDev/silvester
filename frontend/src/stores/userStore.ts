import { create } from 'zustand';

export interface UserData {
    username: string;
    email: string;
    id: number;
    role: string;
    created_at: string;
    updated_at: string;
}

interface UserState {
    userData: UserData | null;
    setUserData: (data: UserData) => void;
    clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userData: null,
    setUserData: (data) => {
        set({ 
            userData: { 
                username: data?.username,
                email: data?.email,
                id: data?.id,
                role: data?.role,
                created_at: data?.created_at,
                updated_at: data?.updated_at,
            }
         });
    },
    clearUserData: () => set({
        userData: null
    }),
}));