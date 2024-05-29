import { TextProps } from "../../interfaces/Message";
import { useContext, useEffect, useState } from "react";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import TaskbarText from "./TaskbarText";
import CodeResult from "./CodeResult";
import { ContentSearchProps } from "./type";

const ContentSearch = ({
  messages,
  scrollTop,
  fetchData,
}: ContentSearchProps) => {
  //
  const {
    app: { stopRender },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const message = messages.list[messages.index];
  const [data, setData] = useState<TextProps[]>([]);
  const [time, setTime] = useState(0);
  const [index, setIndex] = useState(0);
  let timeOut: any;
  const callback = () => {
    if (time === message.content[index].content.length) {
      if (index + 1 < message.content.length) {
        setTime(0);
        setData([...data, message.content[index]]);
        setIndex(index + 1);
      } else {
        dispatch(updateData({ key: "isDone", value: true }));
        clearTimeout(timeOut);
      }
    } else {
      setTime(time + 1);
    }
    return;
  };
  useEffect(() => {
    scrollTop();
    if (stopRender === message.id) {
      clearTimeout(timeOut);
      return;
    }
    if (!messages.isLoading && message.type === "chatgpt") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeOut = setTimeout(callback, 5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.isLoading, time, stopRender]);
  useEffect(() => {
    setData([]);
    setIndex(0);
    setTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.index, messages.isLoading]);
  //
  return (
    <div className="flex items-start gap-5 w-full pb-8">
      {message.type === "user" ? (
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocJ4l-iCA_7EYjxAsxpeZqcsNbym42jlFQo5GLP_PK_KfA=s96-c"
          alt=""
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <i className="bx bx-home-alt text-xl" />
      )}
      <div className="relative">
        <p className="font-bold mb-0.5 text-sm">
          {message.type === "user" ? "You" : "ChatGPT"}
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
                <CodeResult content={item.content} />
              ))
          )}
        {messages.isLoading ? (
          <div>
            <span className="bx bx-loader-alt animate-spin text-green-500"></span>
          </div>
        ) : message.content[index].type === "text" ? (
          <p
            dangerouslySetInnerHTML={{
              __html:
                message.type === "user"
                  ? message.content[index].content
                  : message.content[index].content.slice(0, time),
            }}
          ></p>
        ) : (
          <CodeResult
            content={
              message.type === "user"
                ? message.content[index].content
                : message.content[index].content.slice(0, time)
            }
          />
        )}

        {message.type === "chatgpt" &&
          message.content.length === data.length + 1 && (
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
