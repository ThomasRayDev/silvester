import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { useEnumsStore } from '@/stores/enumsStore';

type ProjectProps = {
  title: string;
  status: string;
};

export default function Project({ title, status }: ProjectProps) {
  const enums = useEnumsStore();

  return (
    <div className="text-slate-100 w-full bg-[#0c1327] border-gray-800 border rounded-xl">
      <div className="h-40 rounded-lg" />
      <div className="p-6 flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">{title}</h2>
          <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary">
            {enums.projectStatuses?.find((s) => s.value === status)?.label ?? status}
          </div>
        </div>
        <p className="text-sm text-slate-400">г. Москва, ул. Ленинградская</p>
        <div>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-gray-300 text-sm">Прогресс</p>
            <p className="text-primary text-sm">0%</p>
          </div>
          <Progress className="h-2 bg-slate-700" value={0} />
        </div>
        <Separator className="bg-slate-700 mt-1" />
        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Бюджет</p>
            <p className="text-sm font-semibold">1.2 млрд ₽</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Срок</p>
            <p className="text-sm font-semibold">15 мар 2026</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-400">Команда</p>
            <p className="text-sm font-semibold">45 чел.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
