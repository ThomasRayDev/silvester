import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, Header } from '../components/layout';
import { useAuthStore } from '../stores/authStore';

export default function MainLayout() {
    const isAuth = useAuthStore((state) => state.token) !== null

    // if (!isAuth) {
    //     return <Navigate to="/login" replace />
    // }

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020618] flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="p-6">
            <Outlet />
        </main>
      </div>
    </div>
    )
}