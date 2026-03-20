import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminCreateUserSchema, type AdminCreateUserData } from "@/schemas/adminCreateUserSchema";
import { useUserStore } from "@/stores/userStore";
import { createNewUser } from "@/api/user";
import { getRolesEnum } from "@/api/enums";

import { toast } from 'sonner';
import { FormRow } from "@/components/layout/FormRow";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Settings() {
  const [createUserLoading, setCreateUserLoading] = React.useState(false);
  const [rolesEnum, setRolesEnum] = React.useState<{ label: string; value: string }[]>([]);
  const user = useUserStore();

  React.useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRolesEnum();
      setRolesEnum(roles);
    }

    fetchRoles();
  }, []);

  const createUserForm = useForm<AdminCreateUserData>({
    resolver: zodResolver(adminCreateUserSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
        role: "",
    }
  })

  const submitCreateUser = async (data: AdminCreateUserData) => {
    setCreateUserLoading(true);
    try {
      const response = await createNewUser(data);
      console.log(response);
      toast.success("Создание пользователя", { 
        description: `Пользователь ${data.username} успешно создан`,
        position: "top-center",
       });
       createUserForm.reset();
    } catch (error) {
      toast.error("Ошибка", {
        description: "Что-то пошло не так, обратитесь к администратору",
        position: "top-center",
      })
    } finally {
      setCreateUserLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-white text-3xl font-bold">Настройки</h1>
      <p className="text-gray-400 my-3">Управление профилем и параметрами системы</p>
      {user.userData?.role === "admin" && <div className="mt-5 text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex gap-3 items-center mb-3">
          <SlidersHorizontal color="#00d5be" strokeWidth="2" size={28} />
          <p className="font-semibold text-lg">Управление системой</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-white mb-2">Создание пользователя</p>
            <form onSubmit={createUserForm.handleSubmit(submitCreateUser)}>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 text-gray-400 w-2/3">
                <div className="flex flex-col gap-1">
                  <FormRow<AdminCreateUserData> 
                    name="username"
                    control={createUserForm.control}
                    label="Имя пользователя"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <FormRow<AdminCreateUserData> 
                    name="email"
                    control={createUserForm.control}
                    label="Электронная почта"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <FormRow<AdminCreateUserData> 
                    name="password"
                    control={createUserForm.control}
                    label="Пароль"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <Controller
                  name="role"
                  control={createUserForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-xs">Роль</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full">
                          <SelectValue placeholder="Выберите роль..." />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {rolesEnum.map((role) => (<SelectItem value={role.value}>{role.label}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                </div>
              </div>
              <Button className="mt-3" variant="secondary" type="submit" disabled={createUserLoading}>
                {createUserLoading && <Spinner data-icon="inline-start" />}
                Создать
              </Button>
            </form>
          </div>
          <div>
            <p className="text-white mb-2">Редактирование пользователя</p>
            <div>
              <p className="text-gray-400 text-sm">Раздел находится в разработке.</p>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
