import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

type ProjectTeamMemberProps = {
  firstname: string;
  secondname: string;
  position: string;
};

export default function ProjectTeamMember({
  firstname,
  secondname,
  position,
}: ProjectTeamMemberProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage />
        <AvatarFallback>
          {firstname[0]}
          {secondname[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">
          {firstname} {secondname}
        </p>
        <p className="text-xs text-slate-400">{position}</p>
      </div>
    </div>
  );
}
