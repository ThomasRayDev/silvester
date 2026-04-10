import dayjs from '@/lib/dayjs-config';
import { Calendar, Dot, Users } from 'lucide-react';

type TaskElementProps = {
  name: string;
  authorFirstname: string;
  authorSecondname: string;
  deadline: string;
};

export default function TaskElement({
  name,
  authorFirstname,
  authorSecondname,
  deadline,
}: TaskElementProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p>{name}</p>
        <div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <Users size={16} />
              {authorSecondname} {authorFirstname[0]}.
            </div>
            <Dot />
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {dayjs.utc(deadline).local().format('DD MMM YYYY')}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-primary border border-primary/50 bg-primary/10 h-max rounded-md px-2 py-0.5">
        В работе
      </div>
    </div>
  );
}
