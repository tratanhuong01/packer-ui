import { TextareaHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  label?: string;
}

const Textarea = (props: TextareaProps) => {
  const { errors, register, label } = props;
  const textareaProps = () => {
    let temp = { ...props };
    delete temp.errors;
    delete temp.register;
    return temp;
  };
  return (
    <>
      {label && (
        <label htmlFor="" className="text-sm font-semibold text-gray-700">
          {label}:
        </label>
      )}
      {register ? (
        <textarea
          {...textareaProps()}
          className={`${props.className || ""} ${
            errors?.description && errors.description?.message
              ? "border-red-500"
              : "focus:border-primary"
          }`}
          {...register(props.name || "name")}
          spellCheck={false}
        />
      ) : (
        <textarea
          {...props}
          className={`${props.className || ""} ${
            errors?.description && errors.description?.message
              ? "border-red-500"
              : "focus:border-primary"
          }`}
          spellCheck={false}
        />
      )}
      {errors?.description && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.description?.message?.toString()}
        </p>
      )}
    </>
  );
};

export default Textarea;
