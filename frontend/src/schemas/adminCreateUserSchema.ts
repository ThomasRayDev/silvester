import * as z from "zod";

export const adminCreateUserSchema = z.object({
    username: z.string().min(1, "Введите имя пользователя"),
    email: z.string().min(1, "Введите адрес электронной почты"),
    password: z.string().min(1, "Введите пароль"),
    role: z.string().min(1, "Выберите роль"),
})

export type AdminCreateUserData = z.infer<typeof adminCreateUserSchema>