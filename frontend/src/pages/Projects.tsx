import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Building2, Calendar, ChartLine, Funnel, Plus, Users } from 'lucide-react';
import { getProjects, type ProjectType } from '@/api/project';
import Project from '@/components/layout/Project';
import { useUserStore } from '@/stores/userStore';

export default function Projects() {
  const navigate = useNavigate();
  const user = useUserStore();

  const [projects, setProjects] = React.useState<ProjectType[]>([]);

  const averageProgress =
    projects.length > 0 ? projects.reduce((sum, p) => sum + p.progress, 0) / projects.length : 0;

  const uniqueEmployees = new Map();
  projects.forEach((project) => {
    project.team.forEach((user) => {
      uniqueEmployees.set(user.id, user);
    });
  });

  React.useEffect(() => {
    const fetchProjects = async () => {
      const _projects = await getProjects();
      setProjects(_projects);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1 className="text-slate-100 text-3xl font-bold">Проекты</h1>
      <p className="text-slate-400 my-3">Управление строительными проектами</p>
      <div className="mt-5 flex justify-between gap-5">
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#35d5c2]/10 w-max p-3 rounded-lg">
              <Building2 className="text-primary" />
            </div>
            <p className="text-slate-400 text-xs">Всего</p>
          </div>
          <p className="font-semibold text-3xl mt-4">{projects.length}</p>
          <p className="text-slate-400 text-sm mt-1">Активных проектов</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-green-500/10 w-max p-3 rounded-lg">
              <ChartLine className="text-green-500" />
            </div>
            <p className="text-slate-400 text-xs">Завершено</p>
          </div>
          <p className="font-semibold text-3xl mt-4">{averageProgress}%</p>
          <p className="text-slate-400 text-sm mt-1">Средний прогресс</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-orange-400/10 w-max p-3 rounded-lg">
              <Calendar className="text-orange-400" />
            </div>
            <p className="text-slate-400 text-xs">Сроки</p>
          </div>
          <p className="font-semibold text-3xl mt-4">0</p>
          <p className="text-slate-400 text-sm mt-1">Близко к дедлайну</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500/10 w-max p-3 rounded-lg">
              <Users className="text-blue-500" />
            </div>
            <p className="text-slate-400 text-xs">Команда</p>
          </div>
          <p className="font-semibold text-3xl mt-4">{uniqueEmployees.size}</p>
          <p className="text-slate-400 text-sm mt-1">Сотрудников</p>
        </div>
      </div>
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl mt-6 flex items-center gap-2">
        <Input className="h-10" placeholder="Поиск проектов..." />
        <Button className="h-10" variant="secondary">
          <Funnel />
          Фильтры
        </Button>
        {(user.userData?.role === 'admin' || user.userData?.role === 'manager') && (
          <Button className="h-10" onClick={() => navigate('/projects/create')}>
            <Plus />
            Новый проект
          </Button>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <Project
            title={project.name}
            status={project.status}
            budget={project.budget}
            deadline={project.end_date}
            teamCount={project.team.length}
            progress={project.progress}
            address={project.address}
          />
        ))}
      </div>
    </>
  );
}
