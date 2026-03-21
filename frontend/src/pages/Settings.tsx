import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminCreateUserSchema, type AdminCreateUserData } from "@/schemas/adminCreateUserSchema";
import { adminEditUserSchema, type AdminEditUserData } from "@/schemas/adminEditUserSchema";
import { useUserStore } from "@/stores/userStore";
import { createNewUser, getAllUsers, updateUser } from "@/api/user";
import { getRolesEnum } from "@/api/enums";

import { toast } from 'sonner';
import { FormRow } from "@/components/layout/FormRow";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/Input";

export default function Settings() {
  const [createUserLoading, setCreateUserLoading] = React.useState(false);
  const [editUserLoading, setEditUserLoading] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string>("");
  const [rolesEnum, setRolesEnum] = React.useState<{ label: string; value: string }[]>([]);
  const [userList, setUserList] = React.useState<{ username: string, email: string, id: number, role: string, created_at: string, updated_at: string }[]>([]);
  const user = useUserStore();

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUserList(users);
  }
  
  React.useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRolesEnum();
      setRolesEnum(roles);
    }

    fetchRoles();
    fetchUsers();
  }, []);

  React.useEffect(() => {
    const user = userList.find((user) => Number(selectedUserId) === user.id);
    if (user) {
      editUserForm.setValue("username", user.username);
      editUserForm.setValue("email", user.email);
      editUserForm.setValue("role", user.role);
      editUserForm.setValue("id", user.id);
      editUserForm.setValue("created_at", user.created_at);
      editUserForm.setValue("updated_at", user.updated_at);
      editUserForm.clearErrors();
    }
  }, [selectedUserId]);

  const createUserForm = useForm<AdminCreateUserData>({
    resolver: zodResolver(adminCreateUserSchema),
    defaultValues: {
        createUserUsername: "",
        createUserEmail: "",
        createUserPassword: "",
        createUserRole: "",
    }
  })

  const editUserForm = useForm<AdminEditUserData>({
    resolver: zodResolver(adminEditUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      id: "",
      created_at: "",
      updated_at: "",
    }
  })
  const watchedUser = editUserForm.watch();

  const submitCreateUser = async (data: AdminCreateUserData) => {
    setCreateUserLoading(true);
    try {
      const response = await createNewUser({
        username: data.createUserUsername,
        email: data.createUserEmail,
        password: data.createUserPassword,
        role: data.createUserRole
      });
      console.log(response);
      toast.success("Создание пользователя", { 
        description: `Пользователь ${data.createUserUsername} успешно создан`,
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

  const submitEditUser = async (data: AdminEditUserData) => {
    setEditUserLoading(true);
    try {
      const response = await updateUser(data);
      console.log(response);
      toast.success("Редактирование пользователя", {
        description: `Пользователь ${data.username} успешно обновлен`,
        position: "top-center",
      })
    } catch (error) {
      toast.error("Ошибка", {
        description: "Что-то пошло не так, обратитесь к администратору",
        position: "top-center",
      })
    } finally {
      setSelectedUserId("");
      editUserForm.reset();
      setEditUserLoading(false);
      fetchUsers();
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
                    name="createUserUsername"
                    control={createUserForm.control}
                    label="Имя пользователя"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <FormRow<AdminCreateUserData> 
                    name="createUserEmail"
                    control={createUserForm.control}
                    label="Электронная почта"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <FormRow<AdminCreateUserData> 
                    name="createUserPassword"
                    control={createUserForm.control}
                    label="Пароль"
                    labelSize="xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                <Controller
                  name="createUserRole"
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
                            {rolesEnum.map((role) => (<SelectItem id={role.value} value={role.value}>{role.label}</SelectItem>))}
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
            <div className="w-2/3">
              <Select value={selectedUserId} onValueChange={(value) => setSelectedUserId(value)}>
                <SelectTrigger className="mt-3 w-1/3">
                  <SelectValue placeholder="Выберите пользователя..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {userList.map((user) => (<SelectItem id={`${user.id}`} value={`${user.id}`}>{user.username} ({user.email})</SelectItem>))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="text-gray-400 mt-4 grid grid-cols-2 grid-rows-2 gap-4">
                <Field>
                  <FieldLabel className="text-xs">ID</FieldLabel>
                  <Input disabled value={watchedUser.id} />
                </Field>
                <Field>
                  <FieldLabel className="text-xs">Создан</FieldLabel>
                  <Input disabled value={watchedUser.created_at} />
                </Field>
                <Field>
                  <FieldLabel className="text-xs">Обновлен</FieldLabel>
                  <Input disabled value={watchedUser.updated_at} />
                </Field>
              </div>
              <form onSubmit={editUserForm.handleSubmit(submitEditUser)}>
                <div className="text-gray-400 mt-4 grid grid-cols-2 grid-rows-2 gap-4">
                  <FormRow<AdminEditUserData> 
                    name="username"
                    control={editUserForm.control}
                    label="Имя пользователя"
                    value={watchedUser.username}
                    disabled={!selectedUserId}
                    labelSize="xs"
                  />
                  <FormRow<AdminEditUserData> 
                    name="email"
                    control={editUserForm.control}
                    label="Электронная почта"
                    value={watchedUser.email}
                    disabled={!selectedUserId}
                    labelSize="xs"
                  />
                  <FormRow<AdminEditUserData> 
                    name="password"
                    control={editUserForm.control}
                    label="Пароль"
                    disabled={!selectedUserId}
                    value={watchedUser.password}
                    labelSize="xs"
                  />
                  <Controller
                  name="role"
                  control={editUserForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-xs">Роль</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full" disabled={!selectedUserId}>
                          <SelectValue placeholder="Выберите роль..." />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {rolesEnum.map((role) => (<SelectItem id={role.value} value={role.value}>{role.label}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" disabled={!selectedUserId || editUserLoading} type="submit">
                    {editUserLoading && <Spinner data-icon="inline-start" />}
                    Сохранить
                  </Button>
                  <Button variant="secondary" disabled={!selectedUserId || editUserLoading} onClick={() => { setSelectedUserId(""); editUserForm.reset(); }}>Очистить</Button>
                  <Button variant="destructive" disabled>Удалить</Button>
                  <Button variant="secondary" disabled>Заблокировать</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
