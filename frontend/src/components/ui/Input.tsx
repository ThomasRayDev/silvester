import clsx from "clsx"

export type InputProps = {
    className?: string
    type?: string
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>
}

export default function Input({ className, type, placeholder, value, onChange }: InputProps) {
  return (
    <input className={clsx("bg-[#141e31] text-[#90a1b9] py-1 px-3 border border-gray-600 rounded-xl", className)} value={value} onChange={onChange} type={type} placeholder={placeholder} />
  );
}
