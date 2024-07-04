import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Popover from "../../../../components/Popover";
import InputSearch from "../InputSearch";
import PopupVersionChat from "../PopupVersionChat";
import ContentSearch from "../ContentSearch";
import { convertHTMLString } from "../../utils";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import Box from "../../../../components/Box";
import ModalSettings from "../../modals/ModalSettings";
import { useAuth0 } from "@auth0/auth0-react";

const StartSearch = () => {
  //
  const {
    app: { current, pendingResponse },
    actions: { updateData },
    dispatch,
  } = useContext(ChatGPTContext);
  const { isAuthenticated, logout, user } = useAuth0();
  const [showSetting, setShowSetting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const scrollTop = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight + 80;
    }
  };
  const fetchData = async (callback?: (str: string) => void) => {
    if (!current) return;
    dispatch(updateData({ key: "isRendering", value: true }));
    const result = await fetch(
      `${process.env.REACT_APP_BASE_URL}/v${
        // Math.floor(
        // Math.random() * (4 - 2 + 1) + 2)
        3
      }/chat-gpt`,
      {
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
      }
    ).then((res) => res.text());
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
  const onScroll = () => {
    if (!ref.current) return;
    if (
      ref.current.scrollHeight - ref.current?.clientHeight ===
      Math.round(ref.current?.scrollTop)
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener("scroll", onScroll);
    if (current) {
      setShow(false);
    }
  }, [current]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      scrollTop();
      clearTimeout(timeOut);
    }, 500);
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
      <div className="absolute top-0 left-0 cursor-pointer bg-white w-full z-50 flex justify-between items-center pr-4">
        <Popover component={<PopupVersionChat />}>
          <div className="w-60 flex items-center gap-0.5 p-4">
            <span className="font-bold text-black">ChatPUI</span>
            <span className="font-semibold">3.5</span>
            <span className="bx bx-chevron-down"></span>
          </div>
        </Popover>
        {showSetting && (
          <ModalSettings closeModal={() => setShowSetting(false)} />
        )}
        {isAuthenticated && (
          <Popover
            className="w-auto"
            position="right-0 mt-2"
            component={
              <div className="w-72 p-1.5">
                <div className="flex items-center gap-2 p-2.5 hover:bg-gray-200 hover:bg-opacity-70 rounded-lg">
                  <i className="bx bx-user"></i>
                  <span>My GPTs</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 hover:bg-gray-200 hover:bg-opacity-70 rounded-lg">
                  <i className="bx bx-cable-car"></i>
                  <span>Customize ChatGPT</span>
                </div>
                <div
                  onClick={() => setShowSetting(true)}
                  className="flex items-center gap-2 mb-2 p-2.5 hover:bg-gray-200 hover:bg-opacity-70 rounded-lg"
                >
                  <i className="bx bx-cog"></i>
                  <span>Settings</span>
                </div>
                <hr className="h-0.5 bg-gray-100" />
                <div
                  onClick={() => logout()}
                  className="flex items-center mt-1.5 gap-2 p-2.5 hover:bg-gray-200 hover:bg-opacity-70 rounded-lg"
                >
                  <i className="bx bx-log-out"></i>
                  <span>Logout</span>
                </div>
              </div>
            }
          >
            <img className="w-9 h-9 rounded-full" src={user?.picture} alt="" />
          </Popover>
        )}
      </div>
      <div className="w-full pl-2 h-full flex-1 flex flex-col relative">
        {!current && (
          <div className="absolute top-1/3 left-1/2 transform-x-center transform-y-center">
            <div className="text-center mb-2">
              <i className="bx bx-home-circle text-5xl"></i>
            </div>
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
        <div ref={ref} className="flex-1 pt-20 pt-10 overflow-y-auto px-3">
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
