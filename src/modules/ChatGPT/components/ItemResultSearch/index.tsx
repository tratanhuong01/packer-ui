import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import Popover from "../../../../components/Popover";
import { MessageProps } from "../../interfaces/Message";
import "./index.scss";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import ModalShare from "../../modals/ModalShare";
import ModalDelete from "../../modals/ModalDelete";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";

const ItemResultSearch = ({
  history,
  handleRemove,
}: {
  history: {
    id: number;
    name: string;
    messages: {
      id: number;
      list: MessageProps[];
    }[];
  };
  handleRemove: Function;
}) => {
  //
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
  const ref = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState<any>();
  const [value, setValue] = useState(generateUUID());
  const {
    app: { current, historyList },
    dispatch,
  } = useContext(ChatGPTContext);
  const handleBur = () => {
    setEdit(false);
    dispatch(
      updateData({ key: "current", value: { ...current, name: value } })
    );
    dispatch(
      updateData({
        key: "historyList",
        value: historyList.map((item) => {
          if (item.id === history.id) {
            return { ...history, name: value };
          }
          return history;
        }),
      })
    );
  };
  useEffect(() => {
    if (edit && ref.current) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);
  //
  return (
    <div
      className={`p-2.5 relative flex items-center cursor-pointer rounded-lg item-result relative ${
        current?.id === history.id ? "bg-gray-200" : "hover:bg-gray-200"
      }`}
    >
      {edit && (
        <div className="absolute top-0 left-0 right-0 bottom-0 border border-solid border-gray-400">
          <input
            ref={ref}
            onBlur={handleBur}
            onKeyUp={(e) => e.key === "Enter" && handleBur()}
            className="h-full w-full p-2"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            spellCheck={false}
          />
        </div>
      )}
      {modal}
      <p
        onDoubleClick={() => setEdit(true)}
        className="pr-12 text-sm whitespace-nowrap text-ellipsis overflow-hidden inline-block"
      >
        {history.name}
      </p>
      {!edit && (
        <div className="result-event-dot absolute top-1/2 transform-y-center right-2 mt-0.5 z-20">
          <Popover
            className="mt-2 rounded-4xl"
            component={
              <div className="w-32 p-2">
                <div
                  onClick={() =>
                    setModal(<ModalShare closeModal={() => setModal("")} />)
                  }
                  className={`p-2 flex items-center gap-2 hover:bg-gray-100`}
                >
                  <i className="bx bx-share-alt text-xl"></i>
                  <span className="text-sm">Share</span>
                </div>
                <div
                  onClick={() => setEdit(true)}
                  className={`p-2 flex items-center gap-2 hover:bg-gray-100`}
                >
                  <i className="bx bx-pencil text-xl"></i>
                  <span className="text-sm">Rename</span>
                </div>
                <div
                  className={`p-2 flex items-center gap-2 hover:bg-gray-100`}
                >
                  <i className="bx bxs-hand text-xl"></i>
                  <span className="text-sm">Archive</span>
                </div>
                <div
                  onClick={() =>
                    setModal(
                      <ModalDelete
                        closeModal={() => setModal("")}
                        handleDelete={handleRemove}
                      />
                    )
                  }
                  className={`p-2 flex items-center gap-2 hover:bg-gray-100 text-red-500`}
                >
                  <i className="bx bx-trash-alt text-xl"></i>
                  <span className="text-sm">Delete</span>
                </div>
              </div>
            }
          >
            <i className="bx bx-dots-horizontal-rounded text-xl cursor-pointer"></i>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default ItemResultSearch;
