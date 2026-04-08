import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100vh-128px)] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3 w-75">
        <p className="text-white font-semibold text-9xl">404</p>
        <p className="text-white font-semibold text-2xl">Страница не найдена</p>
        <p className="text-slate-400 text-center">
          Похоже, вы&nbsp;перешли по&nbsp;неправильной ссылке или страница была удалена.
        </p>
        <div className="mt-5 flex gap-3">
          <Button className="w-30 h-10" onClick={() => navigate('/')}>
            На главную
          </Button>
          <Button variant="outline" className="w-30 h-10" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </div>
        <p className="text-slate-600 text-sm mt-5">Код ошибки: 404</p>
      </div>
    </div>
  );
}
