import Pagination from "../../../components/Pagination";

const PaginationPage = () => {
  return (
    <div>
      <Pagination current={0} handleItem={() => ""} length={20} limit={5} />
    </div>
  );
};

export default PaginationPage;
