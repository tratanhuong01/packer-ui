import { memo, useContext, useEffect, useState } from "react";
import { onProgressUpload } from "../../utils/utils";
import { ItemTaskProgressProps, TaskProgressContext } from "./Context";

const ProgressBar = memo(({ item }: ItemTaskProgressProps) => {
  const [progress, setProgress] = useState(0);
  const {
    custom: { data, taskMerge, current, done, param },
    dispatch,
    actions: { updateData },
  } = useContext(TaskProgressContext);
  const process = (num: number) => {
    if (num === 1) {
      let check = Object.keys(data)
        .map((item) => data[item])
        .filter((item) => item === "success");
      if (check.length === taskMerge.length - 1) {
        console.log("Done......");
      }
      const index = taskMerge.findIndex((task) => task.id === item.id);
      if (index === -1) return;
      dispatch(
        updateData("data", {
          ...data,
          ...(index === taskMerge.length - 1
            ? { [item.id]: "success" }
            : {
                [taskMerge[index + 1]?.id]: "processing",
              }),
          [item.id]: "success",
        })
      );
      dispatch(
        updateData(
          "current",
          taskMerge[index === taskMerge.length - 1 ? index : index + 1].id
        )
      );
      return;
    }
    setProgress(Number((num + 0.01).toFixed(2)));
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await onProgressUpload(process, item.api?.url || "");
      dispatch(updateData("done", [...done, item.id]));
      dispatch(updateData("param", { result, name: item.name }));
    };
    if (
      data[item.id] === "processing" &&
      !done.includes(item.id) &&
      current === item.id &&
      item.api
    ) {
      fetchData();
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, param]);
  // let timeOut: ReturnType<typeof setTimeout>;
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 rounded-sm bg-primary text-white flex items-center justify-center">
        <i
          className={`bx bx-${
            item.type === "file" ? "image-alt" : "data"
          } text-2xl`}
        ></i>
      </div>
      <div className="flex-1">
        {item.type !== "query" && (
          <p className="font-400 text-gray-500 mb-1">{item.name}</p>
        )}
        <div className="h-1.5 rounded-lg overflow-hidden w-full bg-gray-200 relative">
          <div
            className="absolute top-0 left-0 h-1.5 bg-primary transition-all"
            style={{
              width: `${
                data[item.id] === "success"
                  ? 100
                  : ((Math.round(progress * 100) / 100) * 100).toFixed(2)
              }%`,
            }}
          ></div>
        </div>
      </div>
      <span
        className={`bx bx-${
          data[item.id] === "success" ? "check" : "loader-circle"
        } text-xl text-${
          data[item.id] === "success"
            ? "primary"
            : data[item.id] === "processing"
            ? "red-500"
            : "gray-500"
        } ${
          data[item.id] === "success"
            ? ""
            : data[item.id] === "processing" && "animate-spin"
        }`}
      ></span>
    </div>
  );
});
export default ProgressBar;
