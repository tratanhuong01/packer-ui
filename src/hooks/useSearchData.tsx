import { useContext } from "react";
import { ChatGPTContext } from "../contexts/ChatGPTContext/ChatGPTContext";
import {
  HistoryProps,
  MessageChildProps,
} from "../pages/ChatGPT/interfaces/Message";

type SearchDataResponse = {
  handleClick: (type: "stop" | "start") => void;
  current: HistoryProps | null;
  isDone: boolean;
};

type SearchDataProps = {
  value: string;
  callback?: Function;
};

const useSearchData = ({
  value,
  callback,
}: SearchDataProps): SearchDataResponse => {
  const {
    app: { current, historyList, isDone },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);

  const handleClick = (type: "stop" | "start") => {
    if (type === "stop" && !isDone) {
      dispatch(updateData({ key: "stopRender", value: current?.id }));
      dispatch(updateData({ key: "isDone", value: true }));
      return;
    }
    if (!value && !isDone) return;
    const chatGPT: MessageChildProps = {
      id: Math.random(),
      list: [
        {
          id: Math.random(),
          type: "chatgpt",
          content: [],
          contentSearch: value,
        },
      ],
      index: 0,
      isLoading: true,
    };
    const dataPush: MessageChildProps[] = [
      {
        id: Math.random(),
        list: [
          {
            id: Math.random(),
            type: "user",
            content: [
              {
                id: Math.random(),
                content: value,
                type: "text",
              },
            ],
          },
        ],
        index: 0,
        isLoading: false,
      },
      chatGPT,
    ];

    let newHistoryList = [...historyList];
    const index = newHistoryList.findIndex((item) => item.id === current?.id);
    let newCurrent: HistoryProps | null = current;
    if (index === -1) {
      newCurrent = {
        id: Math.random(),
        name: "NewChat." + Math.random(),
        messages: dataPush,
      };

      newHistoryList = [...newHistoryList, newCurrent];
    } else {
      if (current) {
        newCurrent = { ...current };
        newCurrent.messages = [...newCurrent.messages, ...dataPush];
      }
    }
    dispatch(
      updateData({
        key: "current",
        value: newCurrent,
      })
    );
    dispatch(
      updateData({
        key: "historyList",
        value: [...newHistoryList],
      })
    );
    dispatch(updateData({ key: "pendingResponse", value: chatGPT }));
    dispatch(updateData({ key: "isDone", value: false }));
    callback && callback();
  };

  return { handleClick, current, isDone };
};

export default useSearchData;
