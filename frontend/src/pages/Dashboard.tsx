import { useAuthStore } from '../stores/authStore';

export default function Dashboard() {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <button
          type="button"
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Выйти
        </button>
      </header>

      <main>
        <p className="text-gray-600 dark:text-gray-400">
          Добро пожаловать. Здесь будет контент дашборда.
        </p>
      </main>
    </div>
  );
}
