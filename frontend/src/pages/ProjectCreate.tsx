import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Percent, Plus, RussianRuble, Undo2, X } from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/field';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

export default function ProjectCreate() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('ru');

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dayjs().startOf('year').add(19, 'day').toDate(),
    to: dayjs().startOf('year').add(39, 'day').toDate(),
  });
  const navigate = useNavigate();

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
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Название проекта</FieldLabel>
              <Input />
            </Field>
            <div className="flex gap-4">
              <Field>
                <FieldLabel>Город</FieldLabel>
                <Input />
              </Field>
              <Field>
                <FieldLabel>Улица</FieldLabel>
                <Input />
              </Field>
              <Field>
                <FieldLabel>Номер дома</FieldLabel>
                <Input />
              </Field>
              <Field>
                <FieldLabel>Квартира</FieldLabel>
                <Input />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Статус</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="new">В процессе</SelectItem>
                      <SelectItem value="new">Завершен</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Бюджет</FieldLabel>
                <InputGroup className="bg-[#141e31] border-gray-600">
                  <InputGroupInput />
                  <InputGroupAddon align="inline-end">
                    <RussianRuble />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
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
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <FieldLabel>Прогресс</FieldLabel>
                <InputGroup className="bg-[#141e31] border-gray-600">
                  <InputGroupInput />
                  <InputGroupAddon align="inline-end">
                    <Percent />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>
            <Field>
              <FieldLabel>Описание</FieldLabel>
              <Textarea className="resize-none" />
            </Field>
            <Field>
              <FieldLabel>Сотрудники</FieldLabel>
              <div className="border border-gray-600 p-2 rounded-lg border-dotted flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-3 p-3 w-max bg-[#141e31] border border-gray-600 rounded-lg">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>АИ</AvatarFallback>
                    </Avatar>
                    <div className="w-max">
                      <p>Артём Ильченко</p>
                      <p className="text-slate-400 text-xs">Администратор</p>
                    </div>
                    <Button variant="ghost">
                      <X />
                    </Button>
                  </div>
                </div>
                <Button variant="ghost">
                  <X />
                </Button>
              </div>
            </Field>
            <Button variant="secondary" className="w-max">
              <Plus />
              Добавить сотрудника
            </Button>
          </div>
          <div className="mt-4 pt-4 flex gap-3 border-gray-800 border-t">
            <Button>Сохранить</Button>
            <Button variant="secondary">Отменить</Button>
            <Button variant="destructive">Удалить</Button>
          </div>
        </div>
        <div className="mt-5 text-slate-100 w-1/3 bg-[#0c1327] p-5 border-gray-800 border rounded-xl"></div>
      </div>
    </>
  );
}
