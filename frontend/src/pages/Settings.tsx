import React from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminCreateUserSchema, type AdminCreateUserData } from "@/schemas/adminCreateUserSchema";
import { adminEditUserSchema, type AdminEditUserData } from "@/schemas/adminEditUserSchema";
import { changePasswordSchema, type ChangePasswordData } from "@/schemas/changePasswordSchema";

import { useUserStore } from "@/stores/userStore";
import { useEnumsStore } from "@/stores/enumsStore";
import { createNewUser, getAllUsers, updateUser, changePassword } from "@/api/user";
import { fetchCurrentUser } from "@/lib/userService";

import { toast } from 'sonner';
import { FormRow } from "@/components/layout/FormRow";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Shield, SlidersHorizontal } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/Input";

export default function Settings() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('ru');

  const [userList, setUserList] = React.useState<{ username: string, email: string, id: number, role: string, created_at: string, updated_at: string, firstname: string, secondname: string, position: string }[]>([]);

  const [createUserLoading, setCreateUserLoading] = React.useState(false);
  const [editUserLoading, setEditUserLoading] = React.useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = React.useState(false);

  const [selectedUserId, setSelectedUserId] = React.useState<string>("");

  const [changePasswordState, setChangePasswordState] = React.useState(false);

  const user = useUserStore();
  const enums = useEnumsStore();

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUserList(users);
  }
  
  React.useEffect(() => {
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
      editUserForm.setValue("firstname", user.firstname);
      editUserForm.setValue("secondname", user.secondname);
      editUserForm.setValue("position", user.position);
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
        createUserFirstname: "",
        createUserSecondname: "",
        createUserPosition: "",
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
      firstname: "",
      secondname: "",
      position: "",
    }
  })
  const watchedUser = editUserForm.watch();

  const changePasswordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    }
  })

  const submitCreateUser = async (data: AdminCreateUserData) => {
    setCreateUserLoading(true);
    try {
      await createNewUser({
        username: data.createUserUsername,
        email: data.createUserEmail,
        password: data.createUserPassword,
        role: data.createUserRole,
        firstname: data.createUserFirstname,
        secondname: data.createUserSecondname,
        position: data.createUserPosition,
      });
      toast.success("Создание пользователя", { 
        description: `Пользователь ${data.createUserUsername} успешно создан`,
        position: "top-center",
       });
       createUserForm.reset();
       fetchUsers();
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
      await updateUser(data);
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

  const submitChangePassword = async (data: ChangePasswordData) => {
    if (data.newPassword !== data.repeatNewPassword) {
      toast.error("Ошибка", {
        description: "Пароли не совпадают, проверьте правильность введенного пароля",
        position: "top-center",
      })
      return;
    }
    setChangePasswordLoading(true);
    try {
      await changePassword(data);
      toast.success("Смена пароля", {
        description: "Пароль успешно изменен",
        position: "top-center",
      })
      changePasswordForm.reset();
      setChangePasswordState(false);
    } catch (error: any) {
      let description = "Неверный пароль, проверьте правильность введенного пароля"
      if (error.status != 403) {
        description = "Что-то пошло не так, обратитесь к администратору"
      }
      toast.error("Ошибка", {
        description,
        position: "top-center",
      })
    } finally {
      setChangePasswordLoading(false);
      await fetchCurrentUser();
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
              <div className="grid grid-cols-2 grid-rows-4 gap-4 text-gray-400 w-2/3">
                <FormRow<AdminCreateUserData> 
                  name="createUserUsername"
                  control={createUserForm.control}
                  label="Имя пользователя"
                  labelSize="xs"
                />
                <FormRow<AdminCreateUserData> 
                    name="createUserEmail"
                    control={createUserForm.control}
                    label="Электронная почта"
                    labelSize="xs"
                  />
                <FormRow<AdminCreateUserData> 
                    name="createUserPassword"
                    control={createUserForm.control}
                    label="Пароль"
                    labelSize="xs"
                  />
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
                            {enums.roles?.map((role) => (<SelectItem id={role.value} value={role.value}>{role.label}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <FormRow<AdminCreateUserData> 
                  name="createUserFirstname"
                  control={createUserForm.control}
                  label="Имя"
                  labelSize="xs"
                />
                <FormRow<AdminCreateUserData> 
                  name="createUserSecondname"
                  control={createUserForm.control}
                  label="Фамилия"
                  labelSize="xs"
                />
                <FormRow<AdminCreateUserData> 
                  name="createUserPosition"
                  control={createUserForm.control}
                  label="Должность"
                  labelSize="xs"
                />
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
                  <Input disabled value={watchedUser.created_at ? dayjs.utc((watchedUser.created_at)).local().format("DD.MM.YYYY HH:mm") : ""} />
                </Field>
                <Field>
                  <FieldLabel className="text-xs">Обновлен</FieldLabel>
                  <Input disabled value={watchedUser.updated_at ? dayjs.utc((watchedUser.updated_at)).local().format("DD.MM.YYYY HH:mm") : ""} />
                </Field>
              </div>
              <form onSubmit={editUserForm.handleSubmit(submitEditUser)}>
                <div className="text-gray-400 mt-4 grid grid-cols-2 grid-rows-4 gap-4">
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
                              {enums.roles?.map((role) => (<SelectItem id={role.value} value={role.value}>{role.label}</SelectItem>))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <FormRow<AdminEditUserData> 
                    name="firstname"
                    control={editUserForm.control}
                    label="Имя"
                    value={watchedUser.firstname}
                    disabled={!selectedUserId}
                    labelSize="xs"
                  />
                  <FormRow<AdminEditUserData> 
                    name="secondname"
                    control={editUserForm.control}
                    label="Фамилия"
                    value={watchedUser.secondname}
                    disabled={!selectedUserId}
                    labelSize="xs"
                  />
                  <FormRow<AdminEditUserData> 
                    name="position"
                    control={editUserForm.control}
                    label="Должность"
                    value={watchedUser.position}
                    disabled={!selectedUserId}
                    labelSize="xs"
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
      <div className="mt-5 text-white w-full bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
        <div className="flex gap-3 items-center mb-6">
          <Shield color="#00d5be" strokeWidth="2" size={28} />
          <p className="font-semibold text-lg">Безопасность</p>
        </div>
        <div className="mx-20 flex flex-col gap-2 text-gray-400">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center font-semibold">
              <Lock color={"#99a1af"} />
              <p className="text-white">Пароль</p>
            </div>
            <Button variant="secondary" onClick={() => { setChangePasswordState(!changePasswordState); changePasswordForm.reset(); }}>Изменить</Button>
          </div>
          <p className="text-sm">Последнее изменение: {dayjs.utc((user.userData?.password_updated)).local().format('DD MMMM YYYY, HH:mm')}</p>
          {changePasswordState && <form className="w-1/2 flex flex-col gap-2" onSubmit={changePasswordForm.handleSubmit(submitChangePassword)}>
            <FormRow<ChangePasswordData> 
              name="currentPassword"
              control={changePasswordForm.control}
              label="Текущий пароль"
              type="password"
            />
            <FormRow<ChangePasswordData> 
              name="newPassword"
              control={changePasswordForm.control}
              label="Новый пароль"
              type="password"
            />
            <FormRow<ChangePasswordData> 
              name="repeatNewPassword"
              control={changePasswordForm.control}
              label="Новый пароль ещё раз"
              type="password"
            />
            <Button variant="secondary" className="w-max" type="submit" disabled={changePasswordLoading}>
              {changePasswordLoading && <Spinner data-icon="inline-start" />}
              Сохранить
            </Button>
          </form>}
        </div>
      </div>
    </>
  );
}
