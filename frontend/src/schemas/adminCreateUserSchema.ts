import * as z from "zod";

export const adminCreateUserSchema = z.object({
    createUserUsername: z.string().min(1, "Введите имя пользователя"),
    createUserEmail: z.string().min(1, "Введите адрес электронной почты"),
    createUserPassword: z.string().min(1, "Введите пароль"),
    createUserRole: z.string().min(1, "Выберите роль"),
})

export type AdminCreateUserData = z.infer<typeof adminCreateUserSchema>