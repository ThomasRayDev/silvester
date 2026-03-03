import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
    return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#020618] flex">
        <Outlet />
    </div>
    )
}