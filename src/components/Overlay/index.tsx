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
      style={{ zIndex: 20 }}
      className={
        isPosition
          ? `top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 ${
              isPosition || "z-30"
            }`
          : "w-full h-full bg-black bg-opacity-80"
      }
    ></div>
  );
};

export default Overlay;
