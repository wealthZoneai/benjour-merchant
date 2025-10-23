"use client";

import * as React from "react";
import { ChevronsUpDown, SquareCheckBig } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  value: string | string[];
  /* eslint-disable no-unused-vars */
  onValueChange: (value: string | string[]) => void;
  onBlur?: () => void;
  placeholder: string;
  emptyMessage: string;
  isMulti?: boolean;
  isClientSpace?: boolean;
  error?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  onBlur,
  placeholder,
  emptyMessage,
  isMulti = false,
  isClientSpace = false,
  error,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = React.useState<number | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);
  const IsMulti = () => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((selectedValue) => (
              <div
                key={selectedValue}
                className="rounded bg-paleGreen-100 px-2 py-1 text-base text-bg-green"
              >
                {selectedValue}
              </div>
            ))}
          </div>
        );
      } else {
        return <span>{placeholder}</span>; // Wrap the placeholder in a valid JSX element
      }
    } else {
      const label = options.find((option) => option.value === value)?.label;
      return label ? <span>{label}</span> : <span>{placeholder}</span>; // Ensure a JSX element is always returned
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (isMulti) {
      const newValue = Array.isArray(value) ? value : [];
      const updatedValue = newValue.includes(selectedValue)
        ? newValue.filter((v) => v !== selectedValue)
        : [...newValue, selectedValue];
      onValueChange(updatedValue);
    } else {
      onValueChange(selectedValue);
      setOpen(false);
    }
  };

  return (
    <div className={`${isClientSpace && "!space-y-0"}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger tabIndex={0} asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full h-[49.6px] justify-between bg-white text-base focus:ring-primary focus:outline-none ${
              error && "border border-danger"
            }`}
            tabIndex={0}
            onBlur={onBlur}
          >
            <IsMulti />
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          tabIndex={1}
          className="p-0 z-50 bg-white shadow-lg"
          style={{ width: buttonWidth || "auto" }}
        >
          <Command>
            <CommandInput
              className="custome_placeholder"
              placeholder="Search..."
            />
            <CommandList tabIndex={2}>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    tabIndex={0}
                  >
                    <SquareCheckBig
                      tabIndex={3}
                      className={`mr-2 h-4 w-4
                        ${
                          isMulti &&
                          Array.isArray(value) &&
                          value.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        }
                        ${
                          !isMulti && value === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Error Message */}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
}
