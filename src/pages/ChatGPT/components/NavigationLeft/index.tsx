import { useContext } from "react";
import Box from "../../../../components/Box";
import Parent from "../../../../components/Parent";
import ItemResultSearch from "../ItemResultSearch";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";

const NavigationLeft = () => {
  //
  const {
    app: { historyList },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  //
  return (
    <Parent className="w-72 flex flex-col p-2 bg-gray-100 bg-opacity-50">
      <div
        onClick={() => {
          dispatch(updateData({ key: "current", value: null }));
        }}
        className="w-full flex items-center justify-between p-2 hover:bg-gray-100 transition-colors 
        cursor-pointer"
      >
        <div className="items-center flex gap-2">
          <i className="bx bx-home-circle text-xl"></i>
          <span className="text-xs font-semibold">New Chat</span>
        </div>
        <i className="bx bx-edit"></i>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 pt-8">
          <p className="text-xs font-bold mb-2 text-gray-500">Today</p>
          {historyList.map((item) => (
            <ItemResultSearch key={item.id} history={item} />
          ))}
        </div>
        <div className="">
          <div className="flex items-center gap-2 mb-2 hover:bg-gray-100 cursor-pointer p-2">
            <Box width={30} height={30} rounded>
              <i className="bx bx-star"></i>
            </Box>
            <div>
              <p className="font-semibold">Upgrade plan</p>
              <p className="text-xs">Get GPT-4, DALLE, and more</p>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer p-2">
            <img
              className="w-7 h-7 rounded-full"
              src="https://lh3.googleusercontent.com/a/ACg8ocJ4l-iCA_7EYjxAsxpeZqcsNbym42jlFQo5GLP_PK_KfA=s96-c"
              alt=""
            />
            <span className="text-sm font-semibold">Packer Dev</span>
          </div>
        </div>
      </div>
    </Parent>
  );
};

export default NavigationLeft;
