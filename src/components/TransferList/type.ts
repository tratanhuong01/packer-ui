type TransferListType = {
  getItems: () => Promise<
    {
      key: string;
      value: string;
      checked?: boolean;
    }[]
  >;
  height?: number;
};

export default TransferListType;
