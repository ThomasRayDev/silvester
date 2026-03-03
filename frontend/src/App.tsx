import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Projects, Tasks, Requests, Reports, History, Settings, Login } from './pages';
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
