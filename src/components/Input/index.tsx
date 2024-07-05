import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import "./index.scss";
import InputProps from "./type";
import useClickOutside from "../../hooks/useClickOutside";
import Button from "../Button";

const Input = (props: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  //
  const {
    type,
    placeholder,
    className,
    rounded,
    handleClick,
    handleChange,
    spellcheck = false,
    width,
    height,
    error,
    disabled,
    debounce,
    rightContent,
  } = props;
  const [data, setData] = useState({
    showPassword: false,
  });
  const [value, setValue] = useState<string>((props.value as string) || "");
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const refContainer = useClickOutside({
    handleClick: (bool: Boolean | null) => {
      bool && setIsFocus(false);
      !bool && handleClick && handleClick();
    },
    status: isFocus,
  });
  const customProps = () => {
    let temp = { ...props };
    delete temp.handleChange;
    delete temp.handleClick;
    delete temp.label;
    delete temp.rounded;
    delete temp.spellCheck;
    delete temp.height;
    delete temp.width;
    delete temp.error;
    delete temp.debounce;
    delete temp.mode;
    delete temp.rightContent;
    return temp;
  };
  const mode = props.mode || "normal";
  useEffect(() => {
    if (debounce) {
      debounce.handleStart();
      const getData: any = setTimeout(() => {
        clearTimeout(getData);
        debounce.handleCallback && debounce.handleCallback(value || "");
      }, 500);
      return () => clearTimeout(getData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const idRandom = Math.random();
  //
  return (
    <div
      ref={refContainer.ref}
      className={`input__container flex flex-col gap-2 ${
        className || ""
      }`.trim()}
    >
      {props.label && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-600">{props.label}</p>
            {props.required && (
              <span className="text-red-500 font-bold">*</span>
            )}
          </div>
          {rightContent && (
            <p
              onClick={() => {
                rightContent.handle();
              }}
              className="text-gray-600 cursor-pointer"
            >
              {rightContent.label}
            </p>
          )}
        </div>
      )}
      <div
        onClick={() => setIsFocus(true)}
        className="relative"
        style={{ width, height }}
      >
        {type === "color" && (
          <label
            htmlFor={props.id || idRandom.toString()}
            className="block w-8 h-8 rounded-full bg-gray-200 cursor-pointer"
            style={{ background: value }}
          ></label>
        )}
        {type === "file" && (
          <Button type="button" mode="primary">
            <label htmlFor={props.id || idRandom.toString()}>
              Upload files
            </label>
          </Button>
        )}
        {type === "search" && (
          <i
            className="bx bx-search absolute top-1/2 text-base text-gray-400 left-4 transform-y-center 
          cursor-pointer"
          ></i>
        )}
        <input
          id={props.id || idRandom.toString()}
          {...customProps()}
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
              ? "border-solid border-gray-200 border-2 focus:border-primary"
              : mode === "standard"
              ? "border-b-8 border-transparent border-b-solid border-b-gray-200"
              : "border-none"
          } py-3 lead-none ${rounded ? "rounded-full" : "rounded-md"} ${
            type === "search" ? "pl-10" : mode !== "standard" ? "pl-2" : ""
          } ${
            type === "password" ? "pr-12" : mode !== "standard" ? "pr-4" : ""
          } ${type === "file" || type === "color" ? "hidden" : ""}`}
          spellCheck={spellcheck}
          disabled={disabled}
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
                    isFocus ? "text-primary" : ""
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
        <p className="text-red-500 text-sm font-normal my-1.5">{error}</p>
      )}
    </div>
  );
};

export default Input;
