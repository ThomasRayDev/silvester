import { Link } from "react-router-dom"
import { Briefcase, ClipboardList, FileText, LayoutDashboard, MessageSquare, History, Settings, type LucideIcon } from "lucide-react"

export type SidebarNavItem = {
  icon: LucideIcon
  label: string
  url: string
}

export const defaultItems: SidebarNavItem[] = [
  { icon: LayoutDashboard, label: "Дашборд", url: "/dashboard" },
  { icon: Briefcase, label: "Проекты", url: "/projects" },
  { icon: ClipboardList, label: "Мои задачи", url: "/tasks" },
  { icon: MessageSquare, label: "Запросы с объекта", url: "/requests" },
  { icon: FileText, label: "Отчёты", url: "/reports" },
  { icon: History, label: "История изменений", url: "/history" },
  { icon: Settings, label: "Настройки", url: "/settings" },
]

export type SidebarNavProps = {
  activeIndex?: number
  items?: SidebarNavItem[]
  onItemClick?: (index: number) => void
}

export default function SidebarNav({ activeIndex, items = defaultItems, onItemClick }: SidebarNavProps) {
  return (
    <div className="w-full p-5">
      <div className="font-semibold flex flex-col gap-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index
          const Icon = item.icon
          return (
            <Link 
              to={item.url}
              key={index}
              role={onItemClick ? "button" : undefined}
              onClick={onItemClick ? () => onItemClick(index) : undefined}
              className={`flex gap-3 py-4 px-3 -mx-3 rounded-lg transition-colors ${
                isActive
                  ? "text-[#00d5be] bg-[#00d5be]/10"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
              } ${onItemClick ? "cursor-pointer" : ""}`}
            >
              <Icon className="shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
