import { TextProps } from "../../interfaces/Message";
import { useContext, useEffect, useState } from "react";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import TaskbarText from "./TaskbarText";
import CodeResult from "./CodeResult";
import { ContentSearchProps } from "./type";
import { saveHistory } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
const ContentSearch = ({
  messages,
  scrollTop,
  fetchData,
}: ContentSearchProps) => {
  //
  const { user } = useAuth0();
  const {
    app: { current, isRendering },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const message = messages.list[messages.index];
  const [data, setData] = useState<TextProps[]>([]);
  const [time, setTime] = useState(0);
  const [index, setIndex] = useState(0);
  let timeOut: any;
  const callback = async () => {
    if (time === message.content[index].content.length) {
      if (index + 1 < message.content.length) {
        setTime(0);
        setData([...data, message.content[index]]);
        setIndex(index + 1);
      } else {
        dispatch(updateData({ key: "isRendering", value: false }));
        let temp = { ...current };
        temp.messages = temp.messages?.map((item) => {
          item.list = (item.list || []).map((val) => {
            val.contentSearch = val.contentSearch || "";
            if (val.id === message.id) {
              val.rendered = true;
            }
            return val;
          });
          return item;
        });
        dispatch(updateData({ key: "current", value: temp }));
        await saveHistory({
          history: temp,
          userId: "packer-tra",
        });
        clearTimeout(timeOut);
      }
    } else {
      setTime(time + 1);
    }
    return;
  };
  useEffect(() => {
    if (message.rendered) {
      setData(message.content);
      return;
    }
    if (!isRendering) return;
    scrollTop();

    if (!messages.isLoading && message.type === "chatgpt") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeOut = setTimeout(callback, 5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.isLoading, time]);
  useEffect(() => {
    if (!message.rendered) {
      setData([]);
    }
    setIndex(0);
    setTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.index, messages.isLoading]);
  //
  return (
    <div className="flex items-start gap-5 w-full pb-8">
      {message.type === "user" ? (
        <img src={user?.picture} alt="" className="w-6 h-6 rounded-full" />
      ) : (
        <i className="bx bx-home-alt text-xl" />
      )}
      <div className="relative">
        <p className="font-bold mb-0.5 text-sm">
          {message.type === "user" ? "You" : "ChatPUI"}
        </p>
        {!messages.isLoading &&
          message.content.map(
            (item, index) =>
              index + 1 <= data.length &&
              (item.type === "text" ? (
                <p
                  key={item.id}
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                ></p>
              ) : (
                <CodeResult key={item.id} content={item.content} />
              ))
          )}
        {messages.isLoading ? (
          <div>
            <span className="bx bx-loader-alt animate-spin text-green-500"></span>
          </div>
        ) : (
          message.type === "chatgpt" &&
          (message.content[index].type === "text" ? (
            <p
              dangerouslySetInnerHTML={{
                __html: message.content[index].content.slice(0, time),
              }}
            ></p>
          ) : (
            <CodeResult
              content={message.content[index].content.slice(0, time)}
            />
          ))
        )}
        {message.type === "chatgpt" &&
          (message.content.length === data.length + 1 ||
            message.content.length === data.length) && (
            <TaskbarText
              content={messages.list[messages.index].content
                .map((item) => item.content)
                .join(" ")}
              fetchData={fetchData}
              messages={messages}
            />
          )}
      </div>
    </div>
  );
};

export default ContentSearch;
