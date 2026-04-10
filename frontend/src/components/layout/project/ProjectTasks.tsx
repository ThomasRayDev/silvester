import type { TaskType } from '@/api/project';
import { TaskElement } from '..';
import { Button } from '@/components/ui/button';

type ProjectTasksProps = {
  tasks: TaskType[];
};

export default function ProjectTasks({ tasks }: ProjectTasksProps) {
  return (
    <div className="text-slate-100 w-2/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl flex flex-col h-max">
      <p className="font-semibold text-lg">Активные задачи</p>
      <div className="p-6 flex flex-col gap-10">
        {tasks.map((task) => (
          <TaskElement
            key={task.id}
            name={task.name}
            authorFirstname={task.author.firstname}
            authorSecondname={task.author.secondname}
            deadline={task.deadline}
          />
        ))}
      </div>
      <Button className="mt-auto w-max" disabled>
        Создать задачу
      </Button>
    </div>
  );
}
