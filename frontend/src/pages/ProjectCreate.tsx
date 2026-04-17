import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { type User } from '@/api/user';
import { type CreateProjectData } from '@/schemas/createProjectSchema';
import { createProject } from '@/api/project';
import { toast } from 'sonner';
import { ProjectForm } from '@/components/layout/project/ProjectForm';

export default function ProjectCreate() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);

  const submitCreateProject = async (data: CreateProjectData, users: User[]) => {
    const _data = {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      budget: Number(data.budget),
      team: users.map((user) => user.id),
      address: {
        city: data?.city,
        street: data?.street,
        house: data?.house,
        apartment: data?.apartment,
      },
    };
    setIsLoading(true);
    try {
      await createProject(_data);
      toast.success('Создание проекта', {
        description: 'Проект успешно создан',
        position: 'top-center',
      });
      navigate('/projects');
    } catch (error) {
      toast.error('Ошибка', {
        description: 'Что-то пошло не так, обратитесь к администратору',
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button className="size-10" onClick={() => navigate('/projects')}>
          <Undo2 className="size-5" />
        </Button>
        <h1 className="text-slate-100 text-3xl font-bold">Создание проекта</h1>
      </div>
      <div className="flex gap-4">
        <div className="mt-5 text-slate-100 w-2/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <ProjectForm onSubmit={submitCreateProject} isLoading={isLoading} />
        </div>
        <div className="mt-5 text-slate-100 w-1/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl h-max">
          <Field>
            <FieldLabel>Заметки</FieldLabel>
            <Textarea className="h-40" />
          </Field>
        </div>
      </div>
    </>
  );
}
