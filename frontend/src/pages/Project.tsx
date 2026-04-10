import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, ChartLine, DollarSign, MapPin, Users } from 'lucide-react';

export default function Project() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Button variant="link" className="text-slate-400 w-max">
          <ArrowLeft />
          Назад к проектам
        </Button>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-2xl">ЖК "Северная звезда"</h2>
              <div className="text-slate-400 flex gap-2 items-center">
                <MapPin size={16} />
                <p className="text-sm">г. Москва, ул. Ленинградская, д. 125</p>
              </div>
              <p className="text-slate-100 w-1/2">
                Строительство многоквартирного жилого комплекса класса комфорт. Включает 3 корпуса
                по 18 этажей, подземный паркинг на 200 мест, детскую площадку и благоустроенную
                территорию.
              </p>
            </div>
            <div className="text-primary bg-primary/10 border border-primary min-w-max h-max rounded-full px-4 py-2">
              В процессе
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 font-semibold text-sm">Общий прогресс проекта</p>
              <p className="text-primary font-semibold text-xl">85%</p>
            </div>
            <Progress className="h-3 bg-slate-700" value={85} />
          </div>
        </div>
        <div className="mt-5 flex justify-between gap-5">
          <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="bg-[#35d5c2]/10 w-max p-3 rounded-lg">
                <DollarSign className="text-primary" />
              </div>
              <p className="text-slate-400 text-xs">Бюджет</p>
            </div>
            <p className="font-semibold text-2xl mt-4">1.2 млрд ₽</p>
            <p className="text-slate-400 text-sm mt-1">Потрачено: 1.02 млрд ₽</p>
          </div>
          <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="bg-orange-400/10 w-max p-3 rounded-lg">
                <Calendar className="text-orange-400" />
              </div>
              <p className="text-slate-400 text-xs">Срок сдачи</p>
            </div>
            <p className="font-semibold text-2xl mt-4">15 мар 2026</p>
            <p className="text-slate-400 text-sm mt-1">Старт: 10 янв 2024</p>
          </div>
          <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 w-max p-3 rounded-lg">
                <Users className="text-blue-500" />
              </div>
              <p className="text-slate-400 text-xs">Команда</p>
            </div>
            <p className="font-semibold text-2xl mt-4">45</p>
            <p className="text-slate-400 text-sm mt-1">Специалистов</p>
          </div>
          <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 w-max p-3 rounded-lg">
                <ChartLine className="text-green-500" />
              </div>
              <p className="text-slate-400 text-xs">Выполнено</p>
            </div>
            <p className="font-semibold text-2xl mt-4">142</p>
            <p className="text-slate-400 text-sm mt-1">Из 167 задач</p>
          </div>
        </div>
      </div>
    </>
  );
}
