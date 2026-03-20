import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/Input";

interface FormRowProps<T> {
  name: keyof T;
  control: any;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  labelSize?: string;
}

export const FormRow = <T,>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className,
  labelSize = "sm",
}: FormRowProps<T>) => (
  <Controller
    name={name as any}
    control={control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid} className={className}>
        <FieldLabel htmlFor={field.name} className={`text-${labelSize}`}>{label}</FieldLabel>
        <Input {...field} id={field.name} type={type} placeholder={placeholder} aria-invalid={fieldState.invalid} />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
);