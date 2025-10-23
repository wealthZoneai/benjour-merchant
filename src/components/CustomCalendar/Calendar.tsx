/* eslint-disable no-unused-vars */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import "./DateComponent.css";
import { FormField, FormMessage } from "../Form/form";

interface DatePickerProps {
  control?: any;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  dateFormat?: string;
  onDateChange?: (date: Date | null) => void;
  includeDates?: any;
  labelClassName?: string;
  disableFutureDates?: boolean; // New prop to enable/disable maxDate
}

const Calendar: React.FC<DatePickerProps> = ({
  control  = null,
  name,
  label,
  placeholder = "Select Date",
  className = "",
  dateFormat = "MMM d, yyyy",
  onDateChange,
  labelClassName,
  includeDates,
  disableFutureDates = false, // Default value
}) => {
  const datePickerRef = useRef<DatePicker | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  // Define maxDate to be today if future dates should be disabled
  const maxDate = disableFutureDates ? new Date() : undefined; // Calculate the date 13 years back from today's date
  maxDate?.setFullYear(maxDate?.getFullYear() - 18);

  const handleImageClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const handleFormatDate = (date: any) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setStartDate(formattedDate);
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      if (onDateChange) {
        onDateChange(date);
      }
    }
  };

  return (
    <div className={`w-full relative ${className}`}>
      <div>
        <Label className={`text-form-label ${labelClassName}`}>
          {label} <span className="text-red"> *</span>
        </Label>
      </div>
      <div className="mt-2 h-[49px] flex justify-between border border-black-2 p-3 rounded-[4px]">
        <FormField
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <div className="relative">
              <DatePicker
                ref={datePickerRef} // Attach the ref to the DatePicker
                className="border border-black text-base"
                selected={
                  fieldState?.error?.message
                    ? null
                    : field.value
                    ? new Date(field.value)
                    : startDate
                }
                onChange={(date: Date | null) => {
                  // handleFormatDate(date);
                  field.onChange(date ? date.toISOString() : null);
                  handleDateChange(date);
                }}
                placeholderText={placeholder}
                showMonthDropdown
                showYearDropdown
                includeDates={includeDates}
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                dateFormat={dateFormat}
                maxDate={maxDate} // Conditionally set maxDate
              />
              <FormMessage className="absolute top-[36px] left-[-11px] mt-1 text-danger font-medium text-sm leading-3 1.5xl1:leading-none">
                {fieldState?.error?.message ?? ""}
              </FormMessage>
            </div>
          )}
        />
        <img
          src="/assets/images/calendar_month.svg"
          alt="Calendar Icon"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
