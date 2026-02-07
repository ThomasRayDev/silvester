import { Search } from "lucide-react";

export default function SearchInput() {
  return (
        <div className="relative">
            <Search className="absolute size-6 top-[9px] left-3 text-[#90a1b9]" />
            <input className="bg-[#141e31] text-[#90a1b9] py-2 px-3 pl-10 border border-gray-600 rounded-xl w-100" type="text" placeholder="Поиск проектов, задач..." />
        </div>
  );
}
