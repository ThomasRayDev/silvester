import { useAuthStore } from '../../stores/authStore';
import SearchInput from '../ui/SearchInput';

export default function Header() {
  const { logout } = useAuthStore();

  return (
      <header className="w-full px-4 flex items-center justify-between dark:bg-[#0c1327] h-20 border-b border-gray-800">
        <SearchInput />
        <button
          type="button"
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Выйти
        </button>
      </header>
  );
}
