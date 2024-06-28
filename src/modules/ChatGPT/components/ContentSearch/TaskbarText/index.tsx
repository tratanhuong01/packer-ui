import { useContext } from "react";
import Tooltip from "../../../../../components/Tooltip";
import useCopyText from "../../../../../hooks/useCopyText";
import {
  HistoryProps,
  MessageChildProps,
  MessageProps,
} from "../../../interfaces/Message";
import { ChatGPTContext } from "../../../../../contexts/ChatGPTContext/ChatGPTContext";
import { convertHTMLString, generateUUID } from "../../../utils";
import { TaskbarTextProps } from "../type";

const TaskbarText = ({ content, messages, fetchData }: TaskbarTextProps) => {
  //
  const {
    app: { current },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const { copy, handleClick } = useCopyText(content);
  const handleResult = (isLeft: boolean) => {
    if (!current) return;
    const indexMessage = current.messages.findIndex(
      (item) => item.id === messages.id
    );
    if (indexMessage === -1) return;
    let newCurrent = { ...current };

    if (isLeft) {
      if (messages.index === 0) return;
      newCurrent.messages[indexMessage].index = messages.index - 1;
    } else {
      if (messages.index === messages.list.length) return;
      newCurrent.messages[indexMessage].index = messages.index + 1;
    }
    dispatch(
      updateData({
        key: "current",
        value: newCurrent,
      })
    );
  };
  //
  return (
    <div className="flex items-center gap-2 my-3">
      {messages.list.length > 1 && (
        <ul className="flex items-center gap-0.5 mr-2">
          <li
            onClick={() => handleResult(true)}
            className={`bx bx-chevron-left cursor-pointer ${
              messages.index + 1 === 1 ? "text-gray-300" : ""
            }`}
          ></li>
          <li className="text-sm">
            {messages.index + 1}/{messages.list.length}
          </li>
          <li
            onClick={() => handleResult(false)}
            className={`bx bx-chevron-right cursor-pointer ${
              messages.index + 1 === messages.list.length ? "text-gray-300" : ""
            }`}
          ></li>
        </ul>
      )}
      {!messages.isLoading && (
        <>
          <Tooltip
            handleClick={() => {
              const synth = window.speechSynthesis;
              if (synth) {
                const utterance = new SpeechSynthesisUtterance(content);
                utterance.lang = "vi";
                synth.speak(utterance);
              }
            }}
            title="Copy"
            position="bottom"
          >
            <i
              className={`bx bx-volume-full text-gray-500 hover:text-black cursor-pointer text-lg`}
            ></i>
          </Tooltip>
          <Tooltip handleClick={handleClick} title="Copy" position="bottom">
            <i
              className={`bx bx-${
                copy ? "check" : "copy-alt"
              } text-gray-500 hover:text-black cursor-pointer text-lg`}
            ></i>
          </Tooltip>
          <Tooltip
            handleClick={async () => {
              if (!current) return;
              let newCurrent: HistoryProps = { ...current };
              let newMessages: MessageChildProps = { ...messages };
              newMessages.isLoading = true;
              const indexGenerate = current.messages.findIndex(
                (item) => item.id === newMessages.id
              );
              newCurrent.messages[indexGenerate] = { ...newMessages };
              dispatch(updateData({ key: "current", value: newCurrent }));
              await fetchData((result) => {
                const contentList = convertHTMLString(result);
                const message: MessageProps = {
                  id: generateUUID(),
                  content: contentList,
                  contentSearch: messages.list[messages.index].contentSearch,
                  type: "chatgpt",
                  rendered: false,
                };
                if (indexGenerate !== -1) {
                  newCurrent.messages[indexGenerate] = {
                    ...newCurrent.messages[indexGenerate],
                    list: [...newMessages.list, message],
                    isLoading: false,
                  };
                  handleResult(false);
                  dispatch(updateData({ key: "current", value: newCurrent }));
                }
              });
            }}
            title="Regenerate"
            position="bottom"
          >
            <i className="bx bx-recycle text-gray-500 hover:text-black cursor-pointer text-lg"></i>
          </Tooltip>
          <Tooltip title="Bad response" position="bottom">
            <i className="bx bx-dislike text-gray-500 hover:text-black cursor-pointer text-lg"></i>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default TaskbarText;
