import { useState } from 'react';
import { LogOut } from 'lucide-react';
import SidebarNav from './SidebarNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultItems } from './SidebarNav';
import { useAuthStore } from '@/stores/authStore';
import { Logo } from '../ui';

export default function Sidebar() {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(
    defaultItems.findIndex((item) => item.url === location.pathname.split('/')[1]),
  );

  return (
    <div className="fixed w-72 min-h-full bg-[#0f172b] border-r border-gray-800 flex flex-col items-center">
      <Logo className="cursor-pointer" onClick={() => navigate('/')} />
      <div className="min-h-[calc(100vh-173px)] w-full">
        <SidebarNav activeIndex={activeIndex} onItemClick={setActiveIndex} />
      </div>
      <div
        className="text-gray-400 flex gap-2 font-semibold text-lg justify-center items-center pt-7 border-t border-gray-800 w-full pr-30 cursor-pointer hover:text-red-400"
        onClick={logout}>
        <LogOut />
        <div>Выход</div>
      </div>
    </div>
  );
}
