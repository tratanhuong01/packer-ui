import "./index.scss";

const Loading = ({ container }: { container?: boolean }) => {
  return container ? (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <Loading />
        <div className="flex items-center gap-2 text-sm text-primary">
          <span>Checking image or video affect...</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex items-center justify-center py-5">
      <div className="loader"></div>;
    </div>
  );
};

export default Loading;
