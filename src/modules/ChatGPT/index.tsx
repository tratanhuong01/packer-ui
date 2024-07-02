import Parent from "../../components/Parent";
import NavigationLeft from "./components/NavigationLeft";
import StartSearch from "./components/StartSearch";
import {
  ChatGPTContext,
  ChatGPTProvider,
} from "../../contexts/ChatGPTContext/ChatGPTContext";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import { useContext, useEffect, useState } from "react";
import { updateData } from "../../contexts/ChatGPTContext/Actions";
import { useParams } from "react-router-dom";

const WrapperChatGPT = () => {
  //
  const [fetching, setFetching] = useState(true);
  const [getting, setGetting] = useState(true);
  const {
    app: { current },
    dispatch,
  } = useContext(ChatGPTContext);
  const { historyId } = useParams();
  const { user } = useAuth0();
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/chat-gpt/history/get?id=packer-tra`
      ).then((res) => res.json());
      dispatch(updateData({ key: "historyList", value: result }));
      if (user) {
        setFetching(false);
      }
    };
    user ? fetchData() : setFetching(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    if (historyId && user) {
      const fetchData = async () => {
        setGetting(true);
        const result = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/chat-gpt/history?userId=packer-tra&historyId=${historyId}`
        ).then((res) => res.json());
        dispatch(updateData({ key: "current", value: result }));
        setGetting(false);
        user && setFetching(false);
      };
      if (current?.id !== historyId) fetchData();
      else {
        if (user) {
          setGetting(false);
        }
      }
    } else {
      setGetting(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyId, user]);
  const { isLoading } = useAuth0();
  //
  return (
    <Parent className="w-full h-full overflow-hidden text-gray-700 relative">
      {isLoading || fetching ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
          <Loading />
        </div>
      ) : (
        <>
          <NavigationLeft />
          <div className="relative flex-1 flex flex-col h-full">
            <div className="mx-auto lg:w-full xl:w-10/12 flex-1 h-full">
              {getting ? (
                <div className="w-full h-full flex justify-center items center">
                  <Loading />
                </div>
              ) : (
                <StartSearch />
              )}
            </div>
          </div>
        </>
      )}
    </Parent>
  );
};

const ChatGPT = () => {
  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:8000/api/steam");
  //   const locationUpdate = (event: any) => {
  //     console.log(event.data);
  //     eventSource.removeEventListener("locationUpdate", locationUpdate);
  //   };
  //   eventSource.addEventListener("locationUpdate", locationUpdate);

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  return (
    <ChatGPTProvider>
      <WrapperChatGPT />
    </ChatGPTProvider>
  );
};

export default ChatGPT;
