type InputProps = {
  id?: string;
  type: "text" | "number" | "password" | "email" | "search";
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string | "";
  handleChange?: Function;
  handleClick?: Function;
  rounded?: "default" | "full";
  mode?: "normal" | "outlined" | "filled" | "standard";
};

export default InputProps;
