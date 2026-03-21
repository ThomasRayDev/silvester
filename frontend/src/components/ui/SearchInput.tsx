import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function SearchInput() {
  return (
        <div className="relative mt-[2px]">
            <Search className="absolute size-6 top-[6px] left-2 text-[#90a1b9]" />
            <Input className="py-2 pl-10 w-100 h-9 text-white" type="text" placeholder="Поиск проектов, задач..." />
        </div>
  );
}
