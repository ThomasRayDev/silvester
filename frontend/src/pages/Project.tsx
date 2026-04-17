import { getOneProject, getTasks, type ProjectType, type TaskType } from '@/api/project';
import { ProjectHeader, ProjectStats, ProjectTasks, ProjectTeam } from '@/components/layout';
import { ArrowLeft, Camera } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Project() {
  const [project, setProject] = React.useState<ProjectType>();
  const [tasks, setTasks] = React.useState<TaskType[]>([]);

  const { projectId } = useParams();

  React.useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      const [projectData, tasksData] = await Promise.all([
        getOneProject(Number(projectId)),
        getTasks(Number(projectId)),
      ]);

      setProject(projectData);
      setTasks(tasksData);
    };

    fetchData();
  }, [projectId]);

  if (!project) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <title>{project.name}</title>
      <div className="flex flex-col gap-6">
        <Link
          className="text-slate-400 w-max flex items-center gap-2 cursor-pointer hover:underline text-sm"
          to="/projects">
          <ArrowLeft size={16} />
          Назад к проектам
        </Link>
        <ProjectHeader project={project} />
        <ProjectStats project={project} tasks={tasks} />
        <div className="flex justify-between gap-5">
          <ProjectTasks tasks={tasks} />
          <ProjectTeam project={project} />
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center gap-3">
            <Camera className="text-primary" />
            <p className="font-semibold text-lg">Фотоотчёты с объекта</p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="bg-slate-700 rounded-lg h-70"></div>
            <div className="bg-slate-700 rounded-lg h-70"></div>
            <div className="bg-slate-700 rounded-lg h-70"></div>
          </div>
        </div>
      </div>
    </>
  );
}
