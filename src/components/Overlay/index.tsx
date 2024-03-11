const Overlay = (props: {
  isPosition?: "fixed" | "absolute";
  handleClick?: Function;
}) => {
  //
  const { isPosition, handleClick } = props;
  //
  return (
    <div
      onClick={() => handleClick && handleClick()}
      className={
        isPosition
          ? `absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 ${
              isPosition || ""
            }`
          : "w-full h-full bg-black bg-opacity-50"
      }
    ></div>
  );
};

export default Overlay;
