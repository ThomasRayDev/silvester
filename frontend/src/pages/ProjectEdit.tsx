import { getOneProject, updateProject } from '@/api/project';
import type { User } from '@/api/user';
import { ProjectForm } from '@/components/layout/project/ProjectForm';
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
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    if (!id) return;

    getOneProject(Number(id)).then(setProject);
  }, [id]);

  const handleUpdate = async (data: CreateProjectData, users: User[]) => {
    if (!id) return;

    setIsLoading(true);

    try {
      await updateProject(Number(id), {
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

      toast.success('Проект обновлен');
      navigate('/projects');
    } catch (error) {
      toast.error('Ошибка при обновлении');
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
        <Button className="size-10" onClick={() => navigate('/projects')}>
          <Undo2 className="size-5" />
        </Button>
        <h1 className="text-slate-100 text-3xl font-bold">Редактирование проекта</h1>
      </div>
      <div className="flex gap-4">
        <div className="mt-5 text-slate-100 w-2/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <ProjectForm
            defaultValues={mapProjectToForm(project)}
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
