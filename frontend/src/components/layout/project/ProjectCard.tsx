import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { useEnumsStore } from '@/stores/enumsStore';
import { type Address } from '@/api/project';

import { formatAddress, formatMoney } from '@/lib/utils';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  title: string;
  status: string;
  budget: number;
  deadline: string;
  teamCount: number;
  progress: number;
  address: Address;
  projectId: number | undefined;
};

export default function ProjectCard({
  title,
  status,
  budget,
  deadline,
  teamCount,
  progress,
  address,
  projectId,
}: ProjectCardProps) {
  const enums = useEnumsStore();

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('ru');

  return (
    <div className="text-slate-100 w-full bg-[#0c1327] border-gray-800 border rounded-xl">
      <div className="h-40 rounded-lg" />
      <div className="p-6 flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between">
          <Link
            to={`/projects/${projectId}`}
            className="font-semibold text-xl cursor-pointer hover:underline">
            {title}
          </Link>
          <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary">
            {enums.projectStatuses?.find((s) => s.value === status)?.label ?? status}
          </div>
        </div>
        <p className="text-sm text-slate-400">{formatAddress(address)}</p>
        <div>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-gray-300 text-sm">Прогресс</p>
            <p className="text-primary text-sm">{progress}%</p>
          </div>
          <Progress className="h-2 bg-slate-700" value={progress} />
        </div>
        <Separator className="bg-slate-700 mt-1" />
        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Бюджет</p>
            <p className="text-sm font-semibold">{formatMoney(budget)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Срок</p>
            <p className="text-sm font-semibold">
              {dayjs.utc(deadline).local().format('DD MMM YYYY')}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Команда</p>
            <p className="text-sm font-semibold">{teamCount} чел.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
