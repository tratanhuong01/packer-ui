import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import Popover from "../../../../components/Popover";
import { HistoryProps } from "../../interfaces/Message";
import "./index.scss";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import ModalShare from "../../modals/ModalShare";
import ModalDelete from "../../modals/ModalDelete";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";
import { useNavigate } from "react-router-dom";
import { saveHistory } from "../../api";

const ItemResultSearch = ({
  history,
  handleRemove,
}: {
  history: HistoryProps;
  handleRemove: Function;
}) => {
  //
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState<any>();
  const [value, setValue] = useState(history.name);
  const refValue = useRef(value);
  const navigate = useNavigate();
  const {
    app: { current, historyList },
    dispatch,
  } = useContext(ChatGPTContext);
  const handleBur = async () => {
    setEdit(false);
    if (refValue.current === value) return;
    setLoading(true);
    let temp = { ...current };
    temp.messages = temp.messages?.map((item) => {
      item.list = (item.list || []).map((val) => {
        val.contentSearch = val.contentSearch || "";
        return val;
      });
      return item;
    });
    await saveHistory({
      history: { ...temp, name: value },
      userId: "packer-tra",
    });
    dispatch(updateData({ key: "current", value: { ...temp, name: value } }));
    dispatch(
      updateData({
        key: "historyList",
        value: [...historyList].map((item) => {
          if (item.id === history.id) {
            return { ...temp, name: value };
          }
          return item;
        }),
      })
    );
    setLoading(false);
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
      className={`px-2.5 relative flex items-center rounded-lg item-result relative ${
        current?.id === history.id ? "bg-gray-200" : "hover:bg-gray-200"
      } ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      {edit && (
        <div className="absolute top-0 left-0 right-0 bottom-0 border border-solid border-gray-400 rounded-lg overflow-hidden">
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
        onClick={() => {
          !loading && navigate(`/chat-gpt/${history.id}`);
        }}
        onDoubleClick={() => !loading && setEdit(true)}
        className="pr-12 py-2.5 flex-1 text-sm whitespace-nowrap text-ellipsis overflow-hidden inline-block"
      >
        {history.name}
      </p>
      {!edit && (
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
              <div className={`p-2 flex items-center gap-2 hover:bg-gray-100`}>
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
          hidden={loading}
        >
          {loading ? (
            <i className="bx bx-loader-circle animate-spin text-primary text-xl" />
          ) : (
            <i className="bx bx-dots-horizontal-rounded text-xl cursor-pointer"></i>
          )}
        </Popover>
      )}
    </div>
  );
};

export default ItemResultSearch;
