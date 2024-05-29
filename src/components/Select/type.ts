type SelectProps = {
  options: ItemSelectProps[];
  handleSelect: (key: string, status: boolean) => void;
};

type ItemSelectProps = {
  key: string;
  value: string;
  checked?: boolean;
};

export type { SelectProps, ItemSelectProps };
