import {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

interface BaseFieldProps {
  label?: string;
  type?: HTMLInputElement["type"];
  className?: string;
  inputClass?: string;
  error?: string;
  children?: ReactNode;
}

export default function Field({
  type,
  inputClass,
  className,
  label,
  error,
  children,
  name,
  ...props
}: BaseFieldProps &
  (
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
    | SelectHTMLAttributes<HTMLSelectElement>
  )) {
  const isCheckbox = type === "checkbox";

  const inputClassName = twMerge(
    "w-full border border-gray-300 rounded-sm p-2 bg-white",
    type !== "textarea" ? "h-12" : "",
    isCheckbox ? "size-auto" : "",
    inputClass
  );

  const containerClassName = twMerge(
    "flex flex-col mb-4",
    isCheckbox ? "flex-row-reverse gap-2 justify-end items-center mb-0" : "",
    className
  );

  const labelClassName = twMerge("text-sm mb-1", isCheckbox ? "mb-0" : "");

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      {type === "textarea" && (
        <textarea
          name={name}
          className={inputClassName}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
      {type === "select" && (
        <select
          {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
          name={name}
          className={inputClassName}
        >
          {children}
        </select>
      )}
      {(!type || !["select", "textarea"].includes(type)) && (
        <input
          type={type}
          name={name}
          className={inputClassName}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
