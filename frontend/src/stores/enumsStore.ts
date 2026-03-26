import { create } from 'zustand';

interface EnumData {
    value: string,
    label: string,
}

interface EnumsState {
    roles: EnumData[] | null;
    setRoles: (data: EnumData[]) => void;
}

export const useEnumsStore = create<EnumsState>((set) => ({
    roles: null,
    setRoles: (data) => {
        set({ 
            roles: data
         });
    },
}));