import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { MessageChildProps, MessageProps } from "../../../interfaces/Message";
import Button from "../../../../../components/Button";
import { ChatGPTContext } from "../../../../../contexts/ChatGPTContext/ChatGPTContext";
import { generateUUID } from "../../../utils";
import { saveHistory } from "../../../api";
import { updateData } from "../../../../../contexts/ChatGPTContext/Actions";
import Loading from "../../../../../components/Loading";

const EditMessage = ({
  messages,
  message,
  setEdit,
  edit,
}: {
  messages: MessageChildProps;
  message: MessageProps;
  setEdit: Function;
  edit: boolean;
}) => {
  const {
    app: { current },
    dispatch,
  } = useContext(ChatGPTContext);
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(
    message.type === "chatgpt" ? "" : message.content[0].content
  );
  useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height =
        refTextarea.current.scrollHeight + "px";
    }
  }, [refTextarea, edit]);
  return (
    <div className="w-11/12 ml-auto rounded-3xl relative pb-12 px-4 pt-4 bg-gray-200 relative">
      {loading && <Loading container overlay />}
      <textarea
        ref={refTextarea}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value);
          if (refTextarea.current) {
            refTextarea.current.style.height = "auto";
            refTextarea.current.style.height =
              refTextarea.current.scrollHeight + "px";
          }
        }}
        spellCheck={false}
        defaultValue={value}
        className="w-full resize-none border-none bg-transparent"
      />
      <div className="flex items-center absolute bottom-4 right-4 gap-2">
        <Button
          handleClick={() => setEdit(false)}
          mode="text"
          rounded="full"
          className="border-black border-solid border bg-white"
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setLoading(true);
            let temp = { ...current };
            if (!temp.messages) return;
            const index = temp.messages.findIndex(
              (item) => item.id === messages.id
            );
            if (index === -1) return;
            temp.messages[index].list.push({
              id: generateUUID(),
              content: [
                {
                  id: generateUUID(),
                  content: value,
                  type: "text",
                },
              ],
              rendered: true,
              type: "user",
              contentSearch: "",
            });
            temp.messages[index].index = temp.messages[index].index + 1;
            await saveHistory({
              history: temp,
              userId: "packer-ui",
            });
            dispatch(updateData({ key: "current", value: temp }));
            setEdit(false);
          }}
          disabled={value.length === 0 || messages.list.length === 3}
          mode="text"
          className="bg-black text-white"
          rounded="full"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default EditMessage;
