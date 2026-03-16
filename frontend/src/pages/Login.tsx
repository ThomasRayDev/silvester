import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Logo } from "../components/ui";
import { Button } from "../components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { loginRequest } from "@/api/auth";

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")
    const { setToken } = useAuthStore();

    const handleSubmit = async () => {
        if (!login || !password) {
            alert("Вы ничего не ввели");
            return;
        }
        try {
            const data = await loginRequest(login, password);
            setToken(data.access_token);
            navigate("/dashboard");
        } catch (error) {
            alert("Неверный логин или пароль");
        }
    }

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
                                <Input value={login} onChange={(event) => setLogin(event.target.value)} />
                            </div>
                            <div className="mt-4 flex flex-col gap-1">
                                <div className="text-white">Пароль</div>
                                <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div>
                                <Button className="px-8 mt-4" variant="default" onClick={handleSubmit}>Войти</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  