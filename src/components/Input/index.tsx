import { ChangeEvent, useRef, useState } from "react";
import "./index.scss";
import InputProps from "./type";
import useClickOutside from "../../hooks/useClickOutside";

const Input = (props: InputProps) => {
  //
  const {
    type,
    placeholder,
    className,
    rounded,
    handleClick,
    handleChange,
    spellcheck,
    width,
    height,
    error,
  } = props;
  const [data, setData] = useState({
    showPassword: false,
  });
  const [value, setValue] = useState(props.value || "");
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const refContainer = useClickOutside({
    handleClick: (bool: Boolean | null) => {
      bool && setIsFocus(false);
      !bool && handleClick && handleClick();
    },
    status: isFocus,
  });
  const mode = props.mode || "normal";

  //
  return (
    <div
      ref={refContainer.ref}
      className={`input__container inline-block ${className || ""}`}
    >
      <div
        onClick={() => setIsFocus(true)}
        className="relative"
        style={{ width, height }}
      >
        {type === "search" && (
          <i
            className="bx bx-search absolute top-1/2 text-base text-gray-400 left-4 transform-y-center 
          cursor-pointer"
          ></i>
        )}
        <input
          ref={ref}
          type={
            type === "password" ? (data.showPassword ? "text" : type) : type
          }
          value={value}
          onChange={(e: ChangeEvent) => {
            setValue((e.target as HTMLInputElement).value);
            handleChange && handleChange((e.target as HTMLInputElement).value);
          }}
          placeholder={mode === "normal" ? placeholder : ""}
          className={`w-full h-full bg-transparent ${
            mode === "normal" || mode === "outlined"
              ? "border-solid border-gray-300 border focus:border-blue-500"
              : mode === "standard"
              ? "border-b-8 border-transparent border-b-solid border-b-gray-400"
              : "border-none"
          } py-3 lead-none ${rounded ? "rounded-full" : "rounded-sm"} ${
            type === "search" ? "pl-10" : mode !== "standard" ? "pl-2" : ""
          } ${
            type === "password" ? "pr-12" : mode !== "standard" ? "pr-4" : ""
          }`}
          spellCheck={spellcheck}
        />
        {mode !== "normal" && type !== "search" && (
          <span
            onClick={() => {
              setIsFocus(true);
              if (ref.current) ref.current.focus();
            }}
            className={`absolute transform-y-center inline-block ${
              mode !== "standard" ? "left-2" : "left-0"
            } transition ${
              isFocus || value
                ? `-top-0.5 text-sm bg-white ${
                    isFocus ? "text-blue-500" : ""
                  } py-0.5 px-1 font-normal `
                : "text-gray-500 opacity-80 pl-0.5 top-1/2"
            }`}
          >
            {placeholder || "Input"}
          </span>
        )}
        {type === "password" && (
          <i
            onClick={() =>
              setData({ ...data, showPassword: !data.showPassword })
            }
            className={`bx bx-${
              !data.showPassword ? "hide" : "show"
            } absolute top-1/2 text-xl text-gray-400 right-4 transform-y-center 
            cursor-pointer ${type}`}
          ></i>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm font-semibold mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
