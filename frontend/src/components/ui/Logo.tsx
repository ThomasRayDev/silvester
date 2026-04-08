import { cn } from '@/lib/utils';

type LogoProps = {
  onClick?: () => void;
  className?: string;
};

export default function Logo({ onClick, className }: LogoProps) {
  return (
    <div
      className={cn(className, 'flex items-center gap-2 border-b border-gray-800 w-full py-7 px-4')}
      onClick={onClick}>
      <div className="bg-[#00d5be] text-black w-8 h-8 rounded-lg text-xl flex justify-center items-center font-bold">
        С
      </div>
      <div className="text-white font-bold text-xl">Сильвестр</div>
    </div>
  );
}
