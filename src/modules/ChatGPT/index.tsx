import Parent from "../../components/Parent";
import NavigationLeft from "./components/NavigationLeft";
import StartSearch from "./components/StartSearch";
import { ChatGPTProvider } from "../../contexts/ChatGPTContext/ChatGPTContext";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
const WrapperChatGPT = () => {
  //
  const { isLoading } = useAuth0();
  //
  return (
    <Parent className="w-full h-full overflow-hidden text-gray-700 relative">
      {isLoading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
          <Loading />
        </div>
      ) : (
        <>
          <NavigationLeft />
          <div className="relative flex-1 flex flex-col">
            <div className="mx-auto lg:w-full xl:w-10/12 flex-1">
              <StartSearch />
            </div>
          </div>
        </>
      )}
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
