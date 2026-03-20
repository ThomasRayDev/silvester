import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import { SlidersHorizontal } from "lucide-react";

export default function Settings() {
  const user = useUserStore();

  return (
    <>
      <h1 className="text-white text-3xl font-bold">Настройки</h1>
      <p className="text-gray-400 my-3">Управление профилем и параметрами системы</p>
      {user.userData?.role === "admin" && <div className="mt-5 text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex gap-3 items-center mb-3">
          <SlidersHorizontal color="#00d5be" strokeWidth="2" size={28} />
          <p className="font-semibold text-lg">Управление системой</p>
        </div>
        <div>
          <p className="text-white text-sm mb-2">Создание пользователя</p>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 text-gray-400 w-2/3">
            <div className="flex flex-col gap-1">
              <p className="text-xs">Логин</p>
              <Input />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Электронная почта</p>
              <Input />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Пароль</p>
              <Input />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Роль</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите роль..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem value="user">Пользователь</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-3" variant="secondary">Создать</Button>
        </div>
      </div>}
    </>
  );
}
