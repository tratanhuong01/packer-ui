type PaginationProps = {
  length: number;
  current: number;
  limit: number;
  handleItem: (item: number) => void;
};
export default PaginationProps;
