import { create } from 'zustand';

interface EnumData {
  value: string;
  label: string;
}

interface EnumsState {
  roles: EnumData[] | null;
  projectStatuses: EnumData[] | null;
  setRoles: (data: EnumData[]) => void;
  setProjectStatuses: (data: EnumData[]) => void;
}

export const useEnumsStore = create<EnumsState>((set) => ({
  roles: null,
  projectStatuses: null,
  setRoles: (data) => {
    set({
      roles: data,
    });
  },
  setProjectStatuses: (data) => {
    set({
      projectStatuses: data,
    });
  },
}));
