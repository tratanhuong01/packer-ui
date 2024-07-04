import { ChangeEvent, KeyboardEvent, useState } from "react";
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
    },
  });
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
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
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Message ChatGPT..."
              className="w-full p-3 rounded-xl border border-gray-300 border-solid"
              value={value}
              spellCheck={false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              onKeyUp={handleKeyPress}
            />
            <Box
              handleClick={() => handleClick(!isRendering ? "start" : "stop")}
              width={32}
              height={32}
              disabled={!value && !isRendering}
              className={`rounded-full absolute top-1/2 transform-y-center right-3 text-2xl ${
                value ? "bg-black cursor-pointer" : ""
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
