import { Building2, Calendar, ChartLine, Users } from "lucide-react";

export default function Projects() {
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Проекты</h1>
      <p className="text-gray-400 my-3">Управление строительными проектами</p>
      <div className="mt-5 flex justify-between gap-5">
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#35d5c2]/10 w-max p-3 rounded-lg">
              <Building2 color={"#35d5c2"} />
            </div>
            <p className="text-gray-400 text-xs">Всего</p>
          </div>
          <p className="font-semibold text-3xl mt-4">12</p>
          <p className="text-gray-400 text-sm mt-1">Активных проектов</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#1bda1c]/10 w-max p-3 rounded-lg">
              <ChartLine color={"#1bda1c"} />
            </div>
            <p className="text-gray-400 text-xs">Завершено</p>
          </div>
          <p className="font-semibold text-3xl mt-4">68%</p>
          <p className="text-gray-400 text-sm mt-1">Средний прогресс</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#f89c0d]/10 w-max p-3 rounded-lg">
              <Calendar color={"#f89c0d"} />
            </div>
            <p className="text-gray-400 text-xs">Сроки</p>
          </div>
          <p className="font-semibold text-3xl mt-4">3</p>
          <p className="text-gray-400 text-sm mt-1">Близко к дедлайну</p>
        </div>
        <div className="text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="bg-[#0d62f8]/10 w-max p-3 rounded-lg">
              <Users color={"#0d62f8"} />
            </div>
            <p className="text-gray-400 text-xs">Команда</p>
          </div>
          <p className="font-semibold text-3xl mt-4">173</p>
          <p className="text-gray-400 text-sm mt-1">Сотрудников</p>
        </div>
      </div>
    </>
  );
}
