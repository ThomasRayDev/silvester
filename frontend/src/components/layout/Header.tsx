import { SearchInput } from '../ui';
import { useUserStore } from '@/stores/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Header() {
  const user = useUserStore();

  return (
    <header className="fixed w-[calc(100vw-288px)] px-6 flex items-center justify-between bg-[#0c1327] h-20 border-b border-gray-800">
      <SearchInput />
      <div className="flex gap-3 items-center">
        <div className="flex flex-col text-sm text-white">
          <p className="font-semibold text-right">
            {user.userData?.firstname} {user.userData?.secondname}
          </p>
          <p className="text-gray-400 text-xs text-right">{user.userData?.position}</p>
        </div>
        <Avatar size="lg">
          <AvatarImage />
          <AvatarFallback>
            {user.userData?.firstname[0]}
            {user.userData?.secondname[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
