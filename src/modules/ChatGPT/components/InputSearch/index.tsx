import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import Box from "../../../../components/Box";
import useSearchData from "../../../../hooks/useSearchData";
import Button from "../../../../components/Button";
import { saveHistory } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

const InputSearch = ({ scrollTop }: { scrollTop: Function }) => {
  //

  const {
    handleClick,
    current,
    isRendering,
    historyList,
    value,
    setValue,
    dispatch,
    updateData,
  } = useSearchData({
    callback: () => {
      setValue("");
      scrollTop();
      followHeight(true);
    },
  });
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) return;
    if (event.key === "Enter") {
      handleClick("start");
    }
  };
  const handleUnArchive = async () => {
    if (!current) return;
    setLoading(true);
    let temp = { ...current };
    temp.messages = temp.messages?.map((item) => {
      item.list = (item.list || []).map((val) => {
        val.contentSearch = val.contentSearch || "";
        return val;
      });
      return item;
    });
    let history = {
      ...temp,
      isArchive: !temp.isArchive,
      timeSaved: new Date(),
    };
    await saveHistory({
      history,
      userId: (user?.nickname || "").replaceAll(".", "-"),
    });
    dispatch(updateData({ key: "current", value: history }));
    dispatch(
      updateData({
        key: "historyList",
        value: [...historyList].map((val) => {
          if (val.id === current?.id) {
            val.isArchive = !val.isArchive;
          }
          return val;
        }),
      })
    );
    setLoading(false);
  };
  const followHeight = (isReset?: boolean) => {
    if (refTextarea.current) {
      if (isReset) {
        refTextarea.current.style.height = "";
      } else {
        refTextarea.current.style.height = "auto";
        const numberLine = refTextarea.current.value
          .substring(0, refTextarea.current.selectionStart)
          .split("\n").length;
        refTextarea.current.style.height =
          numberLine === 1 ? "" : (28 * numberLine).toString() + "px";
      }
    }
  };
  //
  return (
    <div className="w-full">
      {current?.isArchive ? (
        <div className="w-full relative py-3 text-center">
          <p className="text-gray-500 text-center text-sm py-2">
            This conversation is archived. To continue, please unarchive it
            first.
          </p>
          <Button
            onClick={handleUnArchive}
            className="bg-black text-white mx-auto text-sm font-semibold"
            icon="bx bx-archive-in"
            rounded="full"
            loading={loading}
          >
            Unarchive
          </Button>
        </div>
      ) : (
        <>
          <div className="w-full relative pl-4 pr-3 py-3 gap-3 flex items-end rounded-3xl border border-gray-300 border-solid">
            <textarea
              ref={refTextarea}
              placeholder="Message ChatGPT..."
              className="w-full h-7 resize-none border-none max-h-60"
              value={value}
              spellCheck={false}
              onKeyUp={handleKeyPress}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setValue(event.target.value);
                followHeight();
              }}
            />
            <Box
              handleClick={() => handleClick(!isRendering ? "start" : "stop")}
              width={32}
              height={32}
              disabled={!value && !isRendering}
              className={`rounded-full text-2xl ${
                value && value.length <= 1000 ? "bg-black cursor-pointer" : ""
              } ${!isRendering ? "bg-gray-200" : "cursor-pointer"}`}
            >
              {!isRendering ? (
                <i className="bx bx-up-arrow-alt text-white" />
              ) : (
                <i className="bx bx-stop-circle"></i>
              )}
            </Box>
          </div>
          <p className="text-xs text-gray-500 font-semibold text-center py-4">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </>
      )}
    </div>
  );
};

export default InputSearch;
