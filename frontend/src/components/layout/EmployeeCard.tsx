import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

type EmployeeCardProps = {
  firstname: string;
  secondname: string;
  position: string;
  onClickRemove: () => void;
};

export default function EmployeeCard({
  firstname,
  secondname,
  position,
  onClickRemove,
}: EmployeeCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 w-max bg-[#141e31] border border-gray-600 rounded-lg">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>
          {firstname[0]}
          {secondname[0]}
        </AvatarFallback>
      </Avatar>
      <div className="w-max">
        <p>
          {firstname} {secondname}
        </p>
        <p className="text-slate-400 text-xs">{position}</p>
      </div>
      <Button variant="ghost" onClick={onClickRemove}>
        <X />
      </Button>
    </div>
  );
}
