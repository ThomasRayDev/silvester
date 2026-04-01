import * as z from "zod";

export const adminEditUserSchema = z.object({
    username: z.string().min(1, "Введите имя пользователя"),
    email: z.string().min(1, "Введите адрес электронной почты"),
    firstname: z.string().min(1, "Введите имя"),
    secondname: z.string().min(1, "Введите фамилию"),
    position: z.string().min(1, "Введите должность"),
    password: z.string().optional(),
    role: z.string().min(1, "Выберите роль"),
    id: z.number().or(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
})

export type AdminEditUserData = z.infer<typeof adminEditUserSchema>