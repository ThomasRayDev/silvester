import type { ProjectType, TaskType } from '@/api/project';
import dayjs from '@/lib/dayjs-config';
import { formatMoney } from '@/lib/utils';
import { Calendar, ChartLine, DollarSign, Users } from 'lucide-react';

type ProjectStatsProps = {
  project: ProjectType;
  tasks: TaskType[];
};

export default function ProjectStats({ project, tasks }: ProjectStatsProps) {
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;

  return (
    <div className="flex justify-between gap-5">
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="bg-[#35d5c2]/10 w-max p-3 rounded-lg">
            <DollarSign className="text-primary" />
          </div>
          <p className="text-slate-400 text-xs">Бюджет</p>
        </div>
        <p className="font-semibold text-2xl mt-4">{formatMoney(project.budget) ?? 0}</p>
        <p className="text-slate-400 text-sm mt-1">
          Потрачено: {formatMoney(project?.spent_budget) ?? 0}
        </p>
      </div>
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="bg-orange-400/10 w-max p-3 rounded-lg">
            <Calendar className="text-orange-400" />
          </div>
          <p className="text-slate-400 text-xs">Срок сдачи</p>
        </div>
        <p className="font-semibold text-2xl mt-4">
          {dayjs.utc(project?.end_date).local().format('DD MMM YYYY')}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Старт: {dayjs.utc(project?.start_date).local().format('DD MMM YYYY')}
        </p>
      </div>
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/10 w-max p-3 rounded-lg">
            <Users className="text-blue-500" />
          </div>
          <p className="text-slate-400 text-xs">Команда</p>
        </div>
        <p className="font-semibold text-2xl mt-4">{project?.team?.length ?? 0}</p>
        <p className="text-slate-400 text-sm mt-1">Специалистов</p>
      </div>
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/10 w-max p-3 rounded-lg">
            <ChartLine className="text-green-500" />
          </div>
          <p className="text-slate-400 text-xs">Выполнено</p>
        </div>
        <p className="font-semibold text-2xl mt-4">{completedTasks}</p>
        <p className="text-slate-400 text-sm mt-1">Из {tasks.length} задач</p>
      </div>
    </div>
  );
}
