import { useContext } from "react";
import { ChatGPTContext } from "../contexts/ChatGPTContext/ChatGPTContext";
import {
  HistoryProps,
  MessageChildProps,
} from "../modules/ChatGPT/interfaces/Message";
import { generateUUID } from "../modules/ChatGPT/utils";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type SearchDataResponse = {
  handleClick: (type: "stop" | "start") => void;
  current: HistoryProps | null;
  isDone: string[];
  isRendering: boolean;
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
    app: { current, historyList, isDone, isRendering, pendingResponse },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const handleClick = (type: "stop" | "start") => {
    dispatch(
      updateData({ key: "isRendering", value: type === "stop" ? false : true })
    );
    if (type === "stop") {
      dispatch(
        updateData({
          key: "isDone",
          value: pendingResponse?.id
            ? [...isDone, pendingResponse?.id]
            : isDone,
        })
      );
      return;
    }
    const chatGPT: MessageChildProps = {
      id: generateUUID(),
      list: [
        {
          id: generateUUID(),
          type: "chatgpt",
          content: [],
          contentSearch: value,
          rendered: false,
        },
      ],
      index: 0,
      isLoading: true,
    };
    const dataPush: MessageChildProps[] = [
      {
        id: generateUUID(),
        list: [
          {
            id: generateUUID(),
            type: "user",
            content: [
              {
                id: generateUUID(),
                content: value,
                type: "text",
              },
            ],
            rendered: true,
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
        id: generateUUID(),
        name: generateUUID(),
        messages: dataPush,
      };

      newHistoryList = [...newHistoryList, newCurrent];
      if (user) {
        navigate(`/chat-gpt/${newCurrent.id}`);
      }
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
    if (user) {
      dispatch(
        updateData({
          key: "historyList",
          value: [...newHistoryList],
        })
      );
    }
    dispatch(updateData({ key: "pendingResponse", value: chatGPT }));
    callback && callback();
  };

  return { handleClick, current, isDone, isRendering };
};

export default useSearchData;
