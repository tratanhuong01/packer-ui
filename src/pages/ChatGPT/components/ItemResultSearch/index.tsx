import { useContext } from "react";
import Popover from "../../../../components/Popover";
import { MessageProps } from "../../interfaces/Message";
import "./index.scss";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";

const ItemResultSearch = ({
  history,
}: {
  history: {
    id: number;
    name: string;
    messages: {
      id: number;
      list: MessageProps[];
    }[];
  };
}) => {
  //
  const {
    app: { current },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  //
  return (
    <div
      onClick={() => {
        dispatch(updateData({ key: "current", value: history }));
      }}
      className={`p-2.5 relative flex items-center cursor-pointer rounded-lg item-result ${
        current?.id === history.id ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
    >
      <p className="pr-12 text-sm whitespace-nowrap text-ellipsis overflow-hidden inline-block">
        {history.name}
      </p>
      <div className="result-event-dot absolute top-1/2 transform-y-center right-8 mt-0.5 z-20">
        <Popover
          component={
            <div className="w-52 p-1 rounded-lg border shadow-lg relative -top-2 z-10">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`p-2 flex items-center gap-2 hover:bg-gray-200 ${
                    item === 3 ? "text-red-500" : ""
                  }`}
                >
                  <i className="bx bx-trash-alt text-xl"></i>
                  <span className="text-sm">Delete chat</span>
                </div>
              ))}
            </div>
          }
        >
          <i className="bx bx-dots-horizontal-rounded text-xl cursor-pointer"></i>
        </Popover>
      </div>
      <i
        className="result-event-x bx bx-x text-xl cursor-pointer absolute top-1/2 
        transform-y-center right-2"
      ></i>
    </div>
  );
};

export default ItemResultSearch;
