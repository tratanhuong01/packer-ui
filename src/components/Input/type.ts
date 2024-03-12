type InputProps = {
  id?: string;
  type: "text" | "number" | "password" | "email" | "search";
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string | "";
  handleChange?: (value: string) => void;
  handleClick?: Function;
  rounded?: "default" | "full";
  mode?: "normal" | "outlined" | "filled" | "standard";
  spellcheck?: boolean;
  width?: number;
  height?: number;
  error?: string;
};

export default InputProps;
