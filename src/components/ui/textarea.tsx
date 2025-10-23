import * as React from "react";
import { Control, useController } from "react-hook-form";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control?: Control<any>;
  name: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, control, name, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
      defaultValue: props.defaultValue || "",
    });

    return (
      <textarea
        className={cn(
          "mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 overflow-y-auto resize-none text-base",
          className
        )}
        ref={control ? field.ref : ref}
        {...(control ? field : { name, ...props })}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
