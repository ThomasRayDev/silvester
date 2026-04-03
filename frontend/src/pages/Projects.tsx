import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, ChartLine, Funnel, Plus, Users } from "lucide-react";

export default function Projects() {
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
          <p className="font-semibold text-3xl mt-4">2</p>
          <p className="text-slate-400 text-sm mt-1">Активных проектов</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-green-500/10 w-max p-3 rounded-lg">
              <ChartLine className="text-green-500" />
            </div>
            <p className="text-slate-400 text-xs">Завершено</p>
          </div>
          <p className="font-semibold text-3xl mt-4">66%</p>
          <p className="text-slate-400 text-sm mt-1">Средний прогресс</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-orange-400/10 w-max p-3 rounded-lg">
              <Calendar className="text-orange-400" />
            </div>
            <p className="text-slate-400 text-xs">Сроки</p>
          </div>
          <p className="font-semibold text-3xl mt-4">2</p>
          <p className="text-slate-400 text-sm mt-1">Близко к дедлайну</p>
        </div>
        <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500/10 w-max p-3 rounded-lg">
              <Users className="text-blue-500" />
            </div>
            <p className="text-slate-400 text-xs">Команда</p>
          </div>
          <p className="font-semibold text-3xl mt-4">0</p>
          <p className="text-slate-400 text-sm mt-1">Сотрудников</p>
        </div>
      </div>
      <div className="text-slate-100 w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl mt-6 flex items-center gap-2">
        <Input className="h-10" placeholder="Поиск проектов..." />
        <Button className="h-10" variant="secondary">
          <Funnel />
          Фильтры
        </Button>
        <Button className="h-10">
          <Plus />
          Новый проект
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="text-slate-100 w-full bg-[#0c1327] border-gray-800 border rounded-xl">
          <div className="h-40 rounded-lg" />
          <div className="p-6 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">ЖК "Северная звезда"</h2>
              <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary">
                В процессе
              </div>
            </div>
            <p className="text-sm text-slate-400">г. Москва, ул. Ленинградская</p>
            <div>
              <div className="mb-2 flex justify-between items-center">
                <p className="text-gray-300 text-sm">Прогресс</p>
                <p className="text-primary text-sm">66%</p>
              </div>
              <Progress className="h-2 bg-slate-700" value={66} />
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
        <div className="text-slate-100 w-full bg-[#0c1327] border-gray-800 border rounded-xl">
          <div className="h-40 rounded-lg" />
          <div className="p-6 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">ЖК "Северная звезда"</h2>
              <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary">
                В процессе
              </div>
            </div>
            <p className="text-sm text-slate-400">г. Москва, ул. Ленинградская</p>
            <div>
              <div className="mb-2 flex justify-between items-center">
                <p className="text-gray-300 text-sm">Прогресс</p>
                <p className="text-primary text-sm">66%</p>
              </div>
              <Progress className="h-2 bg-slate-700" value={66} />
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
      </div>
    </>
  );
}
