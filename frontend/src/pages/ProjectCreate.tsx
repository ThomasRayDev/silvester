import { useNavigate } from 'react-router-dom';
import { ru } from 'react-day-picker/locale';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Plus, RussianRuble, Undo2, X } from 'lucide-react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import React from 'react';
import dayjs from '@/lib/dayjs-config';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllUsers, type User } from '@/api/user';
import EmployeeCard from '@/components/layout/EmployeeCard';
import { Controller, useForm } from 'react-hook-form';
import { createProjectSchema, type СreateProjectData } from '@/schemas/createProjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEnumsStore } from '@/stores/enumsStore';
import { Spinner } from '@/components/ui/spinner';
import { createProject } from '@/api/project';
import { toast } from 'sonner';

export default function ProjectCreate() {
  const navigate = useNavigate();
  const enums = useEnumsStore();

  const form = useForm<СreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      budget: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      status: '',
      start_date: dayjs().startOf('day').toDate(),
      end_date: dayjs().startOf('day').add(7, 'day').toDate(),
      team: [],
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dayjs().startOf('day').toDate(),
    to: dayjs().startOf('day').add(7, 'day').toDate(),
  });
  const [userList, setUserList] = React.useState<User[]>([]);
  const [availableUsers, setAvailableUsers] = React.useState<User[]>([]);
  const [addedUsers, setAddedUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUserList(users);
      setAvailableUsers(users);
    };

    fetchUsers();
  }, []);

  const addUser = (userId: number) => {
    const foundUser = userList.find((user) => user.id === userId);
    if (foundUser) {
      setAddedUsers((prev) => [...prev, foundUser]);
      setAvailableUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const removeUser = (userId: number) => {
    const foundUser = userList.find((user) => user.id === userId);
    if (foundUser) {
      setAddedUsers((prev) => prev.filter((user) => user.id !== userId));
      setAvailableUsers((prev) => [...prev, foundUser]);
    }
  };

  const submitCreateProject = async (data: СreateProjectData) => {
    const _data = {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      budget: Number(data.budget),
      team: addedUsers.map((user) => user.id),
      address: {
        city: data?.city,
        street: data?.street,
        house: data?.house,
        apartment: data?.apartment,
      },
    };
    setIsLoading(true);
    try {
      await createProject(_data);
      toast.success('Создание проекта', {
        description: 'Проект успешно создан',
        position: 'top-center',
      });
      navigate('/projects');
    } catch (error) {
      toast.error('Ошибка', {
        description: 'Что-то пошло не так, обратитесь к администратору',
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button className="size-10" onClick={() => navigate('/projects')}>
          <Undo2 className="size-5" />
        </Button>
        <h1 className="text-slate-100 text-3xl font-bold">Создание проекта</h1>
      </div>
      <div className="flex gap-4">
        <div className="mt-5 text-slate-100 w-2/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl">
          <form onSubmit={form.handleSubmit(submitCreateProject)}>
            <div className="flex flex-col gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Название проекта</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.value}
                      aria-invalid={fieldState.invalid}
                      onChange={field.onChange}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="flex gap-4">
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Город</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="street"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Улица</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="house"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Номер дома</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="apartment"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Квартира</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Статус</FieldLabel>
                      <Select
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        onValueChange={field.onChange}>
                        <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {enums.projectStatuses?.map((status) => (
                              <SelectItem id={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
                <Controller
                  name="budget"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Бюджет</FieldLabel>
                      <InputGroup className="bg-[#141e31] border-gray-600">
                        <InputGroupInput
                          id={field.name}
                          value={field.value}
                          aria-invalid={fieldState.invalid}
                          onChange={field.onChange}
                        />
                        <InputGroupAddon align="inline-end">
                          <RussianRuble />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <Field>
                <FieldLabel>Сроки</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      id="date-picker-range"
                      className="justify-start px-2.5 font-normal bg-[#141e31] border-gray-600">
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {dayjs(date.from).format('DD MMM, YYYY')} -{' '}
                            {dayjs(date.to).format('DD MMM, YYYY')}
                          </>
                        ) : (
                          dayjs(date.from).format('DD MMM, YYYY')
                        )
                      ) : (
                        <span>Выберите даты</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      locale={ru}
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={(range) => {
                        setDate(range);
                        form.setValue(
                          'start_date',
                          range?.from
                            ? dayjs(range.from).toDate()
                            : dayjs().startOf('day').toDate(),
                        );
                        form.setValue(
                          'end_date',
                          range?.to
                            ? dayjs(range.to).toDate()
                            : dayjs().startOf('day').add(7, 'day').toDate(),
                        );
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Описание</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      className="resize-none"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Field>
                <FieldLabel>Сотрудники</FieldLabel>
                <div className="border border-gray-600 p-2 rounded-lg border-dotted flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    {addedUsers.map((user) => (
                      <EmployeeCard
                        key={user.id}
                        firstname={user.firstname}
                        secondname={user.secondname}
                        position={user.position}
                        onClickRemove={() => removeUser(user.id)}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setAddedUsers([]);
                      setAvailableUsers(userList);
                    }}>
                    <X />
                  </Button>
                </div>
              </Field>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="w-max" type="button">
                    <Plus />
                    Добавить сотрудника
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max">
                  {availableUsers.map((user) => (
                    <DropdownMenuItem key={user.id} onClick={() => addUser(user.id)}>
                      {user.firstname} {user.secondname} - {user.position}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 pt-4 flex gap-3 border-gray-800 border-t">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Spinner data-icon="inline-start" />}
                Сохранить
              </Button>
              <Button variant="secondary" disabled>
                Отменить
              </Button>
              <Button variant="destructive" disabled>
                Удалить
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-5 text-slate-100 w-1/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl h-max">
          <Field>
            <FieldLabel>Заметки</FieldLabel>
            <Textarea className="h-40" />
          </Field>
        </div>
      </div>
    </>
  );
}
