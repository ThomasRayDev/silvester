import { create } from 'zustand';

export interface UserData {
    username: string;
    email: string;
    id: number;
    firstname: string;
    secondname: string;
    position: string;
    role: string;
    password_updated: string;
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
                firstname: data?.firstname,
                secondname: data?.secondname,
                position: data?.position,
                password_updated: data?.password_updated,
            }
         });
    },
    clearUserData: () => set({
        userData: null
    }),
}));