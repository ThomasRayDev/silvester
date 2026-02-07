import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="p-6">
            <p className="text-gray-600 dark:text-gray-400">
            Добро пожаловать. Здесь будет контент дашборда.
            </p>
        </main>
      </div>
    </div>
  );
}
