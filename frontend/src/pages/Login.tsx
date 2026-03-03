import { Input, Logo } from "../components/ui";

export default function Login() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="bg-[#0c1327] w-[600px] h-[400px] border-gray-800 border rounded-2xl">
                <Logo />
                <div className="px-4 py-4">
                    <h2 className="text-white font-bold text-xl">Вход в систему</h2>
                    <div className="w-full flex justify-center">
                        <div className="w-3/4">
                            <div className="mt-4 flex flex-col gap-1">
                                <div className="text-white">Логин</div>
                                <Input />
                            </div>
                            <div className="mt-4 flex flex-col gap-1">
                                <div className="text-white">Пароль</div>
                                <Input />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  