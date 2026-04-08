import { useAuthStore } from '@/stores/authStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function LoginLayout() {
  const isAuth = useAuthStore((state) => state.token) !== null;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-[#020618] flex">
      <Outlet />
    </div>
  );
}
