import { Briefcase, ClipboardList, FileText, LayoutDashboard, MessageSquare, History, Settings, type LucideIcon } from "lucide-react"

export type SidebarNavItem = {
  icon: LucideIcon
  label: string
}

const defaultItems: SidebarNavItem[] = [
  { icon: LayoutDashboard, label: "Дашборд" },
  { icon: Briefcase, label: "Проекты" },
  { icon: ClipboardList, label: "Мои задачи" },
  { icon: MessageSquare, label: "Запросы с объекта" },
  { icon: FileText, label: "Отчёты" },
  { icon: History, label: "История изменений" },
  { icon: Settings, label: "Настройки" },
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
            <div
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
