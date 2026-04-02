import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Building2, Calendar, ChartLine, Funnel, Plus, Users } from "lucide-react";

export default function Projects() {
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Проекты</h1>
      <p className="text-gray-400 my-3">Управление строительными проектами</p>
      <div className="mt-5 flex justify-between gap-5">
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#35d5c2]/10 w-max p-3 rounded-lg">
              <Building2 className="text-primary" />
            </div>
            <p className="text-gray-400 text-xs">Всего</p>
          </div>
          <p className="font-semibold text-3xl mt-4">12</p>
          <p className="text-gray-400 text-sm mt-1">Активных проектов</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-green-500/10 w-max p-3 rounded-lg">
              <ChartLine className="text-green-500" />
            </div>
            <p className="text-gray-400 text-xs">Завершено</p>
          </div>
          <p className="font-semibold text-3xl mt-4">68%</p>
          <p className="text-gray-400 text-sm mt-1">Средний прогресс</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-orange-400/10 w-max p-3 rounded-lg">
              <Calendar className="text-orange-400" />
            </div>
            <p className="text-gray-400 text-xs">Сроки</p>
          </div>
          <p className="font-semibold text-3xl mt-4">3</p>
          <p className="text-gray-400 text-sm mt-1">Близко к дедлайну</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500/10 w-max p-3 rounded-lg">
              <Users className="text-blue-500" />
            </div>
            <p className="text-gray-400 text-xs">Команда</p>
          </div>
          <p className="font-semibold text-3xl mt-4">173</p>
          <p className="text-gray-400 text-sm mt-1">Сотрудников</p>
        </div>
      </div>
      <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl mt-6 flex items-center gap-2">
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
    </>
  );
}
