import Parent from "../../components/Parent";
import NavigationLeft from "./components/NavigationLeft";
import StartSearch from "./components/StartSearch";
import { ChatGPTProvider } from "../../contexts/ChatGPTContext/ChatGPTContext";

const WrapperChatGPT = () => {
  //
  //
  return (
    <Parent className="w-full h-full overflow-hidden text-gray-700">
      <NavigationLeft />
      <div className="relative flex-1 flex flex-col">
        {/* {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <i className="bx bx-loader-alt animate-spin text-5xl text-green-500"></i>
          </div>
        ) : ( */}
        <StartSearch />
        {/* )} */}
      </div>
    </Parent>
  );
};

const ChatGPT = () => {
  return (
    <ChatGPTProvider>
      <WrapperChatGPT />
    </ChatGPTProvider>
  );
};

export default ChatGPT;
