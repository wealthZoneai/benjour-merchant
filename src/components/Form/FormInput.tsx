import React, { ReactNode, ChangeEvent, forwardRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./Input";

interface FormInputProps {
  maxLength?: any;
  control?: any;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  startIcon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  endIcon?: ReactNode | ((value: string, hasError: boolean) => ReactNode);
  InputClassName?: string;
  isInputData?: boolean;
  showIconConditionally?: boolean;
  type?: string;
  disable?: boolean;
  handleFunction?: any;
  isPasswordtrue?: boolean;
  errorMsg?: boolean;
  isAutoFocus?: boolean;
  FormLabelClassName?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  toValidate?: boolean;
  toSuccessValidate?: boolean;
  suffix?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      maxLength,
      control,
      name,
      label,
      placeholder,
      required = false,
      startIcon,
      endIcon,
      InputClassName = "",
      // eslint-disable-next-line no-unused-vars
      isInputData = false,
      // eslint-disable-next-line no-unused-vars
      showIconConditionally = false,
      type,
      isPasswordtrue = true,
      handleFunction,
      isAutoFocus = true,
      errorMsg = true,
      value,
      disable = false,
      onChange,
      // onBlur,
      FormLabelClassName = "",
      toValidate = false,
      toSuccessValidate = false,
      suffix,
    },
    ref
  ) => {
    const handleInput = (e: { target: any }) => {
      const input = e.target;
      if (input.type === "number") {
        // Limit the number of digits based on maxLength
        if (maxLength && input.value.length >= maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
        input.value = input.value.replace(/[^0-9]/g, "");
      }
    };

    const [isInitial, setIsInitial] = useState<boolean>(false);

    const handleIsInitial = () => {
      setIsInitial(true);
    };

    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          // eslint-disable-next-line no-unused-vars
          const { ref: fieldRef, ...fieldWithoutRef } = field;
          return (
            <FormItem>
              <FormLabel
                className={`text-title-md font-medium ${
                  fieldState.error ? "text-danger" : "text-form-label"
                } ${FormLabelClassName || ""}`}
              >
                {label}
                {required && (
                  <span className=" text-danger  text-sm font-medium"> *</span>
                )}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  {startIcon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 mr-4 pointer-events-none">
                      {startIcon}
                    </div>
                  )}
                  <Input
                    maxLength={maxLength}
                    ref={ref}
                    autoFocus={isAutoFocus}
                    type={type}
                    onInput={handleInput}
                    disabled={disable}
                    {...fieldWithoutRef}
                    value={value !== undefined ? value : field.value}
                    onChange={(e: any) => {
                      field.onChange(e);
                      onChange && onChange(e);
                      handleIsInitial();
                    }}
                    // onBlur={() => handleIsInitial()}
                    placeholder={placeholder}
                    required={required}
                    className={`${
                      !fieldState.invalid && field.value !== ""
                        ? "border-green"
                        : fieldState.error
                        ? "border-danger"
                        : "border-cgy4"
                    } 
                  
                     ${startIcon ? ":2xsmpl-12 pl-10" : ""} ${
                      endIcon ? "pr-10 1.5xl1:pr-15" : ""
                    } ${InputClassName} placeholder-gray-500 text-base text-form-label`}
                  />
                  {endIcon && (
                    <div
                      className={`absolute inset-y-0  flex items-center pr-3 ${
                        isPasswordtrue && "pointer-events-none"
                      } ${
                        !toValidate
                          ? "right-[0px] 1.5xl1:right-[-8px]"
                          : toValidate && isInitial
                          ? "right-[35px]"
                          : "right-[11px]"
                      }`}
                      onClick={handleFunction}
                    >
                      {typeof endIcon === "function"
                        ? endIcon(
                            value !== undefined ? value : field.value,
                            !!fieldState.error
                          )
                        : endIcon}
                    </div>
                  )}
                  {toValidate && isInitial && (
                    <div
                      className={`flex items-center justify-center pr-3 absolute -right-0 top-0 h-full ${
                        isPasswordtrue && "pointer-events-none"
                      }`}
                    >
                      {fieldState.error ? (
                        <img src="/assets/logo/error.svg" alt="Error Icon" />
                      ) : (
                        <img
                          src="/assets/logo/check_circle.svg"
                          alt="Check Icon"
                        />
                      )}
                    </div>
                  )}
                  {errorMsg && (
                    <FormMessage className="absolute mt-1 text-danger font-medium text-sm leading-3 1.5xl1:leading-none">
                      {" "}
                      {fieldState?.error?.message ?? ""}
                    </FormMessage>
                  )}
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
