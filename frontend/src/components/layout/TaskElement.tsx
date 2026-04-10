import { Calendar, Dot, Users } from 'lucide-react';

export default function TaskElement() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p>Проверка качества бетона</p>
        <div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <Users size={16} />
              Иванов А.
            </div>
            <Dot />
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              02 фев 2026
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
