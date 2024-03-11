import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Popover from "../../../../components/Popover";
import InputSearch from "../InputSearch";
import PopupVersionChat from "../PopupVersionChat";
import ContentSearch from "../ContentSearch";
import { convertHTMLString } from "../../utils";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import Box from "../../../../components/Box";

const StartSearch = () => {
  //
  const {
    app: { current, pendingResponse },
    actions: { updateData },
    dispatch,
  } = useContext(ChatGPTContext);
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const scrollTop = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight + 80;
    }
  };
  const fetchData = async (callback?: (str: string) => void) => {
    if (!current) return;
    const result = await fetch(`http://192.168.30.106:8000/v1/chat-gpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        current
          ? current.messages
              .map((item) => item.list[0])
              .filter((item) => item.content.length > 0)
              .map((item) => {
                return {
                  role: item.type === "user" ? "user" : "system",
                  content: item.content[0].content,
                };
              })
          : []
      ),
    }).then((res) => res.text());
    if (callback) {
      callback(result);
      return;
    }
    let index = current.messages.findIndex(
      (item) => item.id === pendingResponse?.id
    );

    let newMessages = [...current.messages];
    if (index !== -1) {
      newMessages[index].list[newMessages[index].index].content =
        convertHTMLString(result);
      newMessages[index].isLoading = false;
      dispatch(
        updateData({
          key: "current",
          value: {
            ...current,
            messages: [...newMessages],
          },
        })
      );
    }

    scrollTop();
  };
  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener("scroll", () => {
      if (!ref.current) return;
      if (
        ref.current.scrollHeight - ref.current?.clientHeight ===
        ref.current?.scrollTop
      ) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  }, []);
  useEffect(() => {
    if (pendingResponse) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingResponse]);
  //
  return (
    <Fragment>
      <div className="absolute top-0 left-0 cursor-pointer">
        <Popover component={<PopupVersionChat />}>
          <div className="flex items-center gap-0.5 p-4">
            <span className="font-bold text-black">ChatGPT</span>
            <span className="font-semibold">3.5</span>
            <span className="bx bx-chevron-down"></span>
          </div>
        </Popover>
      </div>
      <div className="w-2/3 mx-auto h-full flex-1 flex flex-col relative">
        {!current && (
          <div className="absolute top-1/3 left-1/2 transform-x-center transform-y-center">
            <div className="text-center mb-2">
              <i className="bx bx-home-circle text-4xl"></i>
            </div>
            <p className="text-xl font-bold text-center">
              How can I help you today?
            </p>
          </div>
        )}
        {show && (
          <Box
            handleClick={scrollTop}
            width={40}
            height={40}
            rounded
            border="border border-solid border-gray-200"
            className="absolute shadow-lg z-30 bottom-32 bg-white cursor-pointer text-2xl 
          left-1/2 transform-x-center"
          >
            <i className="bx bx-down-arrow-alt" />
          </Box>
        )}
        <div
          ref={ref}
          className="flex-1 pt-20 pt-10 overflow-y-auto px-3 scroll-"
        >
          {current &&
            current.messages.map((messages) => (
              <ContentSearch
                key={messages.id}
                messages={messages}
                scrollTop={scrollTop}
                fetchData={fetchData}
              />
            ))}
        </div>
        <InputSearch scrollTop={scrollTop} />
      </div>
    </Fragment>
  );
};

export default StartSearch;
