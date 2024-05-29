import { ItemTaskProgressProps } from "./Context";
import ProgressBar from "./ProgressBar";

const ItemTaskProgress = (props: ItemTaskProgressProps) => {
  //
  //
  return (
    <div className="w-full">
      <p className="font-semibold mb-3 text-gray-500">{props.item.name}</p>
      {props.item.tasks.length === 0 ? (
        <div className="w-full pb-4 border-b border-solid border-gray-200">
          <ProgressBar {...props} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {props.item.tasks.map((task) => (
            <div
              key={Math.random()}
              className="w-full pb-4 border-b border-solid border-gray-200"
            >
              <ProgressBar
                {...{
                  ...props,
                  item: task,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ItemTaskProgress;
