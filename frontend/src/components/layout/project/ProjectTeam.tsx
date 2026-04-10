import type { ProjectType } from '@/api/project';
import { ProjectTeamMember } from '..';

type ProjectTeamProps = {
  project: ProjectType;
};

export default function ProjectTeam({ project }: ProjectTeamProps) {
  return (
    <div className="text-slate-100 w-1/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl h-max">
      <p className="font-semibold text-lg">Команда проекта</p>
      <div className="p-6 flex flex-col gap-10">
        {project?.team.map((member) => (
          <ProjectTeamMember
            key={member.id}
            firstname={member.firstname}
            secondname={member.secondname}
            position={member.position}
          />
        ))}
      </div>
    </div>
  );
}
