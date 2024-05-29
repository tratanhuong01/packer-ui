type AutoCompleteProps = {
  options: any[];
  itemHandle?: (item: any) => void;
  nameSearch?: string;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
};

export default AutoCompleteProps;
