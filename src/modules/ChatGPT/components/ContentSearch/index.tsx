import { TextProps } from "../../interfaces/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import TaskbarText from "./TaskbarText";
import CodeResult from "./CodeResult";
import { ContentSearchProps } from "./type";
import { saveHistory } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import EditMessage from "./EditMessage";
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
  const [edit, setEdit] = useState(false);
  const ref = useRef<any>();
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
        if (user) {
          await saveHistory({
            history: temp,
            userId: (user?.nickname || "").replaceAll(".", "-"),
          });
        }
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
    <div
      className={`flex ${
        message.type === "user" ? "flex-wrap" : ""
      } items-start gap-5 w-full pb-8`}
    >
      {message.type === "user" ? (
        //  (
        //   user ? (
        //     <img src={user?.picture} alt="" className="w-6 h-6 rounded-full" />
        //   ) : (
        //     <i className="bx bx-user text-4xl" />
        //   )
        // )
        !edit && (
          <div className="flex-1 flex mt-1 justify-end">
            {message.type === "user" && (
              <span
                onClick={() => setEdit(true)}
                className="bx bx-pencil ml-auto text-gray-500 hover:bg-gray-100 rounded-full w-8 h-8 flex 
                cursor-pointer transition-all justify-center items-center"
              ></span>
            )}
          </div>
        )
      ) : (
        <i className="bx bx-home-alt text-xl" />
      )}
      {!edit ? (
        <>
          <div
            className={`relative ${
              message.type === "user"
                ? "px-4 py-2 rounded-full bg-gray-200 ml-auto w-auto"
                : "w-full"
            }`}
          >
            {message.type !== "user" && (
              <p className="font-bold mb-0.5 text-sm">ChatPUI</p>
            )}
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
          {message.type === "user" && (
            <div className="w-full -mt-4 flex justify-end">
              {
                <TaskbarText
                  ref={ref}
                  content={messages.list[messages.index].content
                    .map((item) => item.content)
                    .join(" ")}
                  fetchData={fetchData}
                  messages={messages}
                />
              }
            </div>
          )}
        </>
      ) : (
        <EditMessage message={message} messages={messages} setEdit={setEdit} />
      )}
    </div>
  );
};

export default ContentSearch;
