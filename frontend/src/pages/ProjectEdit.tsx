import { getOneProject, updateProject } from '@/api/project';
import { type User } from '@/api/user';
import { ProjectForm } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { mapProjectToForm } from '@/lib/project.mapper';
import type { CreateProjectData } from '@/schemas/createProjectSchema';
import { Undo2 } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function ProjectEdit() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [project, setProject] = React.useState<any>(null);
  const [initialUsers, setInitialUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      const projectData = await getOneProject(Number(projectId));
      setProject(projectData);
      setInitialUsers([...projectData.team]);
    };

    loadData();
  }, [projectId]);

  const handleUpdate = async (data: CreateProjectData, users: User[]) => {
    if (!projectId) return;

    setIsLoading(true);

    try {
      await updateProject(Number(projectId), {
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        budget: Number(data.budget),
        team: users.map((u) => u.id),
        address: {
          city: data.city,
          street: data.street,
          house: data.house,
          apartment: data.apartment,
        },
      });

      toast.success('Редактирование проекта', {
        description: `Проект "${project.name}" успешно изменен`,
        position: 'top-center',
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      toast.error('Ошибка', {
        description: 'Что-то пошло не так, обратитесь к администратору',
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!project) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button className="size-10" onClick={() => navigate(`/projects/${projectId}`)}>
          <Undo2 className="size-5" />
        </Button>
        <h1 className="text-slate-100 text-3xl font-bold">Редактирование проекта</h1>
      </div>
      <div className="flex gap-4">
        <div className="mt-5 text-slate-100 w-2/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <ProjectForm
            defaultValues={mapProjectToForm(project)}
            initialUsers={initialUsers}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
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
