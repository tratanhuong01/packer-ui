type AutoCompleteProps<T> = {
  options: T[];
  itemHandle?: (item: T) => void;
  nameSearch?: keyof T;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  customValue?: any;
  customValueRender?: React.FunctionComponent<{
    value: string;
    object: T;
  }>;
};

export default AutoCompleteProps;
