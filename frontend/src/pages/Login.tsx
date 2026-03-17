import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

import { Logo } from "../components/ui";
import { Button } from "../components/ui/button";

import { useAuthStore } from "@/stores/authStore";
import { loginRequest } from "@/api/auth";
import { toast } from "sonner";
import { FormRow } from "@/components/layout/FormRow";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const { setToken } = useAuthStore();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { username, password } = data;
            const response = await loginRequest(username, password);
            setToken(response.access_token);
            navigate("/dashboard");
        } catch (error: any) {
            let description = "Неверное имя пользователя или пароль";
            if (error.status != 401) { 
                description = "Что-то пошло не так, обратитесь к администратору" 
            }
            toast.error("Ошибка", {
                description,
                position: "top-center",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center w-full">
            <div className="bg-[#0c1327] w-[600px] h-[400px] border-gray-800 border rounded-2xl">
                <Logo />
                <div className="px-4 py-4">
                    <h2 className="text-white font-bold text-xl">Вход в систему</h2>
                    <div className="w-full flex justify-center">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4">
                            <FormRow<LoginFormData>
                                name="username"
                                control={form.control}
                                label="Имя пользователя"
                                className="text-white"
                            />
                            <FormRow<LoginFormData>
                                name="password"
                                control={form.control}
                                label="Пароль"
                                type="password"
                                className="text-white"
                            />
                            <div>
                                <Button className="my-4 w-28 transition-all" variant="default" type="submit" disabled={isLoading}>
                                    {isLoading && <Spinner data-icon="inline-start" />}
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  