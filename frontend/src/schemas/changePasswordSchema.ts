import * as z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Введите пароль"),
    newPassword: z.string().min(1, "Введите пароль"),
    repeatNewPassword: z.string().min(1, "Введите пароль"),
})

export type ChangePasswordData = z.infer<typeof changePasswordSchema>