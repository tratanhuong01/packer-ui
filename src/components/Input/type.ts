type InputProps = {
  handleChange?: (value: string) => void;
  handleClick?: Function;
  rounded?: "default" | "full";
  mode?: "normal" | "outlined" | "filled" | "standard";
  spellcheck?: boolean;
  width?: number;
  height?: number;
  error?: string;
  label?: string;
  debounce?: {
    handleStart: () => void;
    handleCallback: (val: string) => void;
  };
};

export default InputProps;
