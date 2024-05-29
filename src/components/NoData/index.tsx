import noDataImage from "../../assets/images/nodata.jpg";

const NoData = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <img
        src={noDataImage}
        className="w-80 md:w-2/3 lg:w-1/3"
        alt=""
        srcSet=""
      />
    </div>
  );
};

export default NoData;
