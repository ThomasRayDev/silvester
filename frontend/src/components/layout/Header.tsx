import React from 'react';
import { SearchInput } from '../ui';
import { useUserStore } from '@/stores/userStore';
import { getRolesEnum } from '@/api/enums';

export default function Header() {
  const user = useUserStore();
  const [rolesEnum, setRolesEnum] = React.useState<{ label: string, value: string }[]>([]);

  React.useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRolesEnum();
      setRolesEnum(roles);
    }

    fetchRoles();
  }, []);

  return (
      <header className="fixed w-[calc(100vw-288px)] px-4 flex items-center justify-between bg-[#0c1327] h-20 border-b border-gray-800">
        <SearchInput />
        <div className="flex gap-3 items-center">
          <div className="flex flex-col text-sm text-white">
            <p className="font-semibold text-right">{user.userData?.username}</p>
            <p className="text-gray-400 text-xs text-right">{rolesEnum.find(r => r.value === user.userData?.role)?.label}</p>
          </div>
          <div className="text-white w-10 h-10 bg-linear-to-br from-primary to-[#0185d7] flex justify-center items-center rounded-full">{user.userData?.username[0]}</div>
        </div>
      </header>
  );
}
