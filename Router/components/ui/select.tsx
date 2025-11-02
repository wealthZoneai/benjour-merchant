import * as React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ placeholder, options, ...props }) => (
  <select
    {...props}
    className="p-2 border rounded-md w-full bg-white focus:ring-blue-500 focus:border-blue-500"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// To stay compatible with your imports:
export const SelectTrigger = ({ children }: any) => <>{children}</>;
export const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
export const SelectContent = ({ children }: any) => <>{children}</>;
export const SelectItem = ({ value, children }: any) => <option value={value}>{children}</option>;
