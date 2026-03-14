import { useAuthStore } from '../../stores/authStore';
import { SearchInput } from '../ui';

export default function Header() {
  const { logout } = useAuthStore();

  return (
      <header className="w-full px-4 flex items-center justify-between bg-[#0c1327] h-20 border-b border-gray-800">
        <SearchInput />
        <button
          type="button"
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Выйти
        </button>
      </header>
  );
}
