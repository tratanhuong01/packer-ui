import "./index.scss";

const Loading = ({
  container,
  overlay,
}: {
  container?: boolean;
  overlay?: boolean;
}) => {
  return container ? (
    <div
      className={`absolute top-0 left-0 z-50 right-0 bottom-0 top-0 flex items-center justify-center ${
        overlay ? "bg-white bg-opacity-50" : ""
      }`}
    >
      <div className="loader"></div>;
    </div>
  ) : (
    <div className="w-full flex items-center justify-center py-5">
      <div className="loader"></div>;
    </div>
  );
};

export default Loading;
