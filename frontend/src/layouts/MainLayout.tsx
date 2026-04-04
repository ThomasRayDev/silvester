import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, Header } from '../components/layout';
import { useAuthStore } from '../stores/authStore';
import { useEnumsStore } from '@/stores/enumsStore';
import { fetchCurrentUser } from '@/lib/userService';
import React from 'react';
import { getProjectStatutesEnum, getRolesEnum } from '@/api/enums';

export default function MainLayout() {
  const isAuth = useAuthStore((state) => state.token) !== null;

  React.useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRolesEnum();
      useEnumsStore.getState().setRoles(roles);
    };

    const fetchProjectStatuses = async () => {
      const projectStatuses = await getProjectStatutesEnum();
      useEnumsStore.getState().setProjectStatuses(projectStatuses);
    };

    fetchCurrentUser();
    fetchRoles();
    fetchProjectStatuses();
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#020618] flex">
      <Sidebar />
      <div className="w-full ml-72">
        <Header />
        <main className="p-6 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
