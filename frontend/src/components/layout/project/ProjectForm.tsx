import { getAllUsers, type User } from '@/api/user';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/Input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import dayjs from '@/lib/dayjs-config';
import { createProjectSchema, type CreateProjectData } from '@/schemas/createProjectSchema';
import { useEnumsStore } from '@/stores/enumsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Plus, RussianRuble, X } from 'lucide-react';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import { Controller, useForm } from 'react-hook-form';
import EmployeeCard from '../EmployeeCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';

type ProjectFormProps = {
  defaultValues?: Partial<CreateProjectData>;
  initialUsers?: User[];
  onSubmit: (data: CreateProjectData, users: User[]) => Promise<void>;
  isLoading?: boolean;
};

export default function ProjectForm({
  defaultValues,
  initialUsers,
  onSubmit,
  isLoading,
}: ProjectFormProps) {
  const enums = useEnumsStore();

  const form = useForm<CreateProjectData>({
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
      ...defaultValues,
    },
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: form.getValues('start_date'),
    to: form.getValues('end_date'),
  });

  const [userList, setUserList] = React.useState<User[]>([]);
  const [addedUsers, setAddedUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getAllUsers().then(setUserList);
  }, []);

  React.useEffect(() => {
    if (initialUsers) {
      setAddedUsers([...initialUsers]);
    }
  }, [initialUsers]);

  const availableUsers = React.useMemo(
    () => userList.filter((u) => !addedUsers.find((a) => a.id === u.id)),
    [userList, addedUsers],
  );

  const addUser = (user: User) => {
    setAddedUsers((prev) => {
      if (prev.find((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  const removeUser = (userId: number) => {
    setAddedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSubmit = form.handleSubmit((data) => onSubmit(data, addedUsers));

  return (
    <form onSubmit={handleSubmit}>
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
                    range?.from ? dayjs(range.from).toDate() : dayjs().startOf('day').toDate(),
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
              <DropdownMenuItem key={user.id} onClick={() => addUser(user)}>
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
  );
}
