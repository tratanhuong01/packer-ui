import { useContext, useEffect } from "react";
import {
  ItemProgressProps,
  StatusProgress,
  TaskProgressContext,
  TaskProgressProvider,
} from "./Context";
import ItemTaskProgress from "./ItemTaskProgress";

const processData: ItemProgressProps[] = [
  {
    id: Math.random(),
    tasks: [],
    name: "Upload thumbnail",
    type: "file",
    saveParams: true,
    api: {
      url: "users",
      callback: (props) => {},
    },
  },
  {
    id: Math.random(),
    tasks: [],
    name: "Add post",
    type: "query",
    api: {
      url: "products",
      callback: (props) => {},
    },
    receiveParams: (data, value) => {
      return { ...data, thumbnail: value };
    },
  },
  {
    id: Math.random(),
    name: "Add tour",
    type: "query",
    tasks: [],
    api: {
      url: "users",
    },
  },
  {
    id: Math.random(),
    tasks: [
      {
        id: Math.random(),
        name: "image1.png",
        tasks: [],
        type: "file",
        isChildren: true,
        api: {
          url: "products",
        },
      },
      {
        id: Math.random(),
        name: "image2.png",
        tasks: [],
        type: "file",
        isChildren: true,
        api: {
          url: "users",
        },
      },
      {
        id: Math.random(),
        name: "image3.png",
        tasks: [],
        type: "file",
        isChildren: true,
        api: {
          url: "products",
        },
      },
    ],
    name: "Upload image tour",
    type: "file",
  },
];

const Main = () => {
  //
  const {
    custom: { taskList },
    dispatch,
    actions: { updateData },
  } = useContext(TaskProgressContext);
  useEffect(() => {
    let list: ItemProgressProps[] = [];
    let data: StatusProgress = {};
    processData.forEach((item) => {
      if (item.tasks.length > 0) {
        list = [...list, ...item.tasks];
      } else {
        list = [...list, item];
      }
    });
    list.forEach((val, index) => {
      if (index === 0) {
        data[val.id] = "processing";
        dispatch(updateData("current", val.id));
      } else {
        data[val.id] = "pending";
      }
    });
    dispatch(updateData("taskList", processData));
    dispatch(updateData("taskMerge", list));
    dispatch(updateData("data", data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  return (
    <div className="flex gap-5">
      <div className="w-1/2 flex flex-col gap-2">
        {taskList.map((item) => (
          <ItemTaskProgress key={Math.random()} item={item} />
        ))}
      </div>
    </div>
  );
};

const TaskProgress = () => {
  //
  //
  return (
    <TaskProgressProvider>
      <Main />
    </TaskProgressProvider>
  );
};

export default TaskProgress;
