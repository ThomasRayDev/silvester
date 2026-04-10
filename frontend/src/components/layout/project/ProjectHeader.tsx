import type { ProjectType } from '@/api/project';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatAddress } from '@/lib/utils';
import { useEnumsStore } from '@/stores/enumsStore';
import { MapPin, Pencil } from 'lucide-react';

type ProjectHeaderProps = {
  project: ProjectType;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const enums = useEnumsStore();

  const isAddressEmpty =
    !project.address || Object.values(project.address).every((value) => value === '');

  return (
    <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Button disabled>
              <Pencil />
            </Button>
            <h2 className="font-semibold text-2xl">{project.name}</h2>
          </div>
          {!isAddressEmpty && (
            <div className="text-slate-400 flex gap-2 items-center">
              <MapPin size={16} />
              <p className="text-sm">{formatAddress(project.address)}</p>
            </div>
          )}
          <p className="text-slate-100 min-w-1/2">{project.description}</p>
        </div>
        <div className="text-primary bg-primary/10 border border-primary/50 min-w-max h-max rounded-full px-4 py-2">
          {enums.projectStatuses?.find((s) => s.value === project.status)?.label ?? project.status}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-slate-400 font-semibold text-sm">Общий прогресс проекта</p>
          <p className="text-primary font-semibold text-xl">{project.progress}%</p>
        </div>
        <Progress className="h-3 bg-slate-700" value={project.progress} />
      </div>
    </div>
  );
}
