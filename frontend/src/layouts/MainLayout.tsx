import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, Header } from '../components/layout';
import { useAuthStore } from '../stores/authStore';
import { useUserStore, type UserData } from '@/stores/userStore';
import { getCurrentUser } from '@/api/user';
import React from 'react';

export default function MainLayout() {
    const isAuth = useAuthStore((state) => state.token) !== null
    const userStore = useUserStore();

    const fetchCurrentUser = async () => {
      const data = await getCurrentUser();
      userStore.setUserData(data);
    }

    React.useEffect(() => {
      fetchCurrentUser();
    }, []);

    if (!isAuth) {
      return <Navigate to="/login" replace />
    }

    return (
    <div className="min-h-screen bg-[#020618] flex">
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