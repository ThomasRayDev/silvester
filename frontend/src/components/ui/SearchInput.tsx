import { Search } from "lucide-react";
import { Input } from ".";

export default function SearchInput() {
  return (
        <div className="relative">
            <Search className="absolute size-6 top-[9px] left-3 text-[#90a1b9]" />
            <Input className="py-2 pl-10 w-100" type="text" placeholder="Поиск проектов, задач..." />
        </div>
  );
}
